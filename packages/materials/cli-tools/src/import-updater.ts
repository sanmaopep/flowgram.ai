/**
 * import A from 'path'
 * import * as B from 'path'
 * import 'path'
 * import A, { B } from 'path'
 */
interface ImportInfo {
  originRaw?: string; // Origin Row
  from: string;
  /**
   * Default import.
   * e.g. `import A from 'path'`
   *      `import A, { B } from 'path'`
   */
  default?: string;
  /**
   * Namespace import.
   * e.g. `import * as A from 'path'`
   * Note: Cannot be used with `default` or `named` imports.
   */
  namespace?: string;
  /**
   * Named imports.
   * e.g. `import { A, B as C } from 'path'`
   *      `import D, { A, B as C } from 'path'`
   */
  named?: {
    name: string;
    alias?: string;
  }[];
}

export class ImportUpdater {
  constructor(public fileContent: string) {}

  traverseUpdateImports(cb: (importInfo: ImportInfo) => ImportInfo | ImportInfo[]) {
    const importRegex =
      /import(?:(?:\s+(\w+))|(?:\s*\*\s*as\s+(\w+))|(?:\s+\{([^}]+)\}))?\s*from\s*['"]([^'"]+)['"];?/g;
    let match;
    let updatedFileContent = this.fileContent;

    while ((match = importRegex.exec(this.fileContent)) !== null) {
      const [originRaw, defaultImport, namespace, named, from] = match;

      const namedImports = named?.split(',').map((name) => {
        const parts = name.trim().split(/\s+as\s+/);
        return { name: parts[0], alias: parts[1] };
      });

      const importInfo: ImportInfo = {
        originRaw,
        from,
        default: defaultImport,
        namespace,
        named: namedImports,
      };

      const result = cb(importInfo);
      const newImportStatements = (Array.isArray(result) ? result : [result])
        .map((info) => {
          let statement = 'import ';
          if (info.default) {
            statement += `${info.default}`;
          }
          if (info.namespace) {
            statement += `* as ${info.namespace}`;
          }
          if (info.named) {
            if (info.default) {
              statement += ', ';
            }
            statement += `{ ${info.named
              .map((n) => (n.alias ? `${n.name} as ${n.alias}` : n.name))
              .join(', ')} }`;
          }
          if (info.default || info.namespace || info.named) {
            statement += ` from '${info.from}';`;
          } else {
            statement += `'${info.from}';`;
          }
          return statement;
        })
        .join('\n');

      updatedFileContent = updatedFileContent.replace(originRaw, newImportStatements);
    }
    this.fileContent = updatedFileContent;
  }
}
