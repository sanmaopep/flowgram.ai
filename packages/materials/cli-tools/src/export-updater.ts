/**
 * export { A } from 'path'
 * export * as B from 'path'
 * export { A, B as C } from 'path'
 * export * from 'path'
 * export { A, B }
 * export const C = 1
 * export function D() {}
 */
interface ExportInfo {
  originRaw?: string; // Origin Row
  from?: string;
  /**
   * Namespace export.
   * e.g. `export * as A from 'path'`
   */
  namespace?: string;
  /**
   * Named exports.
   * e.g. `export { A, B as C } from 'path'` or `export { A, B }`
   */
  named?: {
    name: string;
    alias?: string;
  }[];
  /**
   * Re-export all.
   * e.g. `export * from 'path'`
   */
  reExportAll?: boolean;
  /**
   * Exported declaration
   * e.g. `export const a = 1`
   * The value is  { type: "const", name: "a" }
   */
  declaration?: {
    type: string;
    name: string;
  };
}

export class ExportUpdater {
  constructor(public fileContent: string) {}

  traverseUpdateExports(cb: (exportInfo: ExportInfo) => ExportInfo | ExportInfo[]) {
    const exportFromRegex = /export\s+(.+?)\s+from\s+(['"]([^'"]+)['"]);/g;
    const exportNamedRegex = /export\s+(\{([^}]+)\});/g;
    // This regex is simplified and might not cover all edge cases for declarations.
    const exportDeclarationRegex = /export\s+((?:const|let|var|function|class|default)\s+[^;]+);/g;

    const fromMatches = [...this.fileContent.matchAll(exportFromRegex)].map((m) => ({
      match: m,
      type: 'from' as const,
    }));
    const namedMatches = [...this.fileContent.matchAll(exportNamedRegex)].map((m) => ({
      match: m,
      type: 'named' as const,
    }));
    const declarationMatches = [...this.fileContent.matchAll(exportDeclarationRegex)].map((m) => ({
      match: m,
      type: 'declaration' as const,
    }));

    const allMatches = [...fromMatches, ...namedMatches, ...declarationMatches].sort(
      (a, b) => a.match.index! - b.match.index!
    );

    if (allMatches.length === 0) {
      return;
    }

    let lastIndex = 0;
    const parts: string[] = [];

    for (const { match, type } of allMatches) {
      const matchIndex = match.index!;
      parts.push(this.fileContent.substring(lastIndex, matchIndex));

      const originRaw = match[0];
      let exportInfo: ExportInfo;

      if (type === 'from') {
        const [, exportClause, , from] = match;
        let namespace: string | undefined;
        let named: { name: string; alias?: string }[] | undefined;
        let reExportAll = false;

        const trimmedClause = exportClause.trim();
        if (trimmedClause === '*') {
          reExportAll = true;
        } else if (trimmedClause.startsWith('* as')) {
          namespace = trimmedClause.substring('* as'.length).trim();
        } else if (trimmedClause.startsWith('{') && trimmedClause.endsWith('}')) {
          const namedPart = trimmedClause.slice(1, -1).trim();
          if (namedPart) {
            named = namedPart.split(',').map((name) => {
              const parts = name.trim().split(/\s+as\s+/);
              return { name: parts[0].trim(), alias: parts[1]?.trim() };
            });
          }
        }
        exportInfo = { originRaw, from, namespace, named, reExportAll };
      } else if (type === 'named') {
        const [originRaw, namedClause, namedPart] = match;
        const named = namedPart
          ? namedPart.split(',').map((name) => {
              const parts = name.trim().split(/\s+as\s+/);
              return { name: parts[0].trim(), alias: parts[1]?.trim() };
            })
          : [];
        exportInfo = { originRaw, named };
      } else {
        // declaration
        const [originRaw, declaration] = match;
        exportInfo = { originRaw, declaration };
      }

      const result = cb(exportInfo);
      const newExportStatements = (Array.isArray(result) ? result : [result])
        .map((info) => {
          if (info.declaration) {
            return `export ${info.declaration};`;
          }

          let statement = 'export ';
          const fromClause = info.from ? ` from '${info.from}';` : ';';

          if (info.reExportAll) {
            return statement + '*' + fromClause;
          }

          if (info.namespace) {
            return statement + `* as ${info.namespace}` + fromClause;
          }

          if (info.named && info.named.length > 0) {
            const namedSpecifiers = info.named
              .map((n) => (n.alias ? `${n.name} as ${n.alias}` : n.name))
              .join(', ');
            return statement + `{ ${namedSpecifiers} }` + fromClause;
          }

          return ''; // Invalid info, produce no output for it.
        })
        .filter(Boolean)
        .join('\n');

      parts.push(newExportStatements);
      lastIndex = matchIndex + originRaw.length;
    }

    parts.push(this.fileContent.substring(lastIndex));
    this.fileContent = parts.join('');
  }
}
