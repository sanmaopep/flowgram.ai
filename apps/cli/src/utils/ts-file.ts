/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from "path";
import fs from "fs";
import { File } from "./file";
import { extractNamedExports } from "./export";
import {
  assembleImport,
  ImportDeclaration,
  traverseFileImports,
} from "./import";

class TsFile extends File {
  exports: {
    values: string[];
    types: string[];
  } = {
    values: [],
    types: [],
  };

  imports: ImportDeclaration[] = [];

  get allExportNames() {
    return [...this.exports.values, ...this.exports.types];
  }

  constructor(filePath: string) {
    super(filePath);

    this.exports = extractNamedExports(fs.readFileSync(filePath, "utf-8"));
    this.imports = Array.from(
      traverseFileImports(fs.readFileSync(filePath, "utf-8")),
    );
  }

  addImport(importDeclarations: ImportDeclaration[]) {
    importDeclarations.forEach((importDeclaration) => {
      importDeclaration.statement = assembleImport(importDeclaration);
    });
    // add in last import statement
    this.replace((content) => {
      const lastImportStatement = this.imports[this.imports.length - 1];
      return content.replace(
        lastImportStatement.statement,
        `${lastImportStatement?.statement}\n${importDeclarations.map(
          (item) => item.statement,
        )}\n`,
      );
    });
    this.imports.push(...importDeclarations);
  }

  removeImport(importDeclarations: ImportDeclaration[]) {
    this.replace((content) =>
      importDeclarations.reduce(
        (prev, cur) => prev.replace(cur.statement, ""),
        content,
      ),
    );
    this.imports = this.imports.filter(
      (item) => !importDeclarations.includes(item),
    );
  }

  replaceImport(
    oldImports: ImportDeclaration[],
    newImports: ImportDeclaration[],
  ) {
    newImports.forEach((importDeclaration) => {
      importDeclaration.statement = assembleImport(importDeclaration);
    });
    this.replace((content) => {
      oldImports.forEach((oldImport, idx) => {
        const replaceTo = newImports[idx];
        if (replaceTo) {
          content = content.replace(oldImport.statement, replaceTo.statement);
          this.imports.map((_import) => {
            if (_import.statement === oldImport.statement) {
              _import = replaceTo;
            }
          });
        } else {
          content = content.replace(oldImport.statement, "");
          this.imports = this.imports.filter(
            (_import) => _import.statement !== oldImport.statement,
          );
        }
      });

      const restNewImports = newImports.slice(oldImports.length);
      if (restNewImports.length > 0) {
        const lastImportStatement = newImports[oldImports.length - 1].statement;
        content = content.replace(
          lastImportStatement,
          `${lastImportStatement}\n${restNewImports.map(
            (item) => item.statement,
          )}\n`,
        );
      }
      this.imports.push(...restNewImports);

      return content;
    });
  }
}

export function* traverseRecursiveTsFiles(folder: string): Generator<TsFile> {
  const files = fs.readdirSync(folder);
  for (const file of files) {
    const filePath = path.join(folder, file);
    if (fs.statSync(filePath).isDirectory()) {
      yield* traverseRecursiveTsFiles(filePath);
    } else {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        yield new TsFile(filePath);
      }
    }
  }
}

export function getIndexTsFile(folder: string): TsFile | undefined {
  // ts or tsx
  const files = fs.readdirSync(folder);
  for (const file of files) {
    if (file === "index.ts" || file === "index.tsx") {
      return new TsFile(path.join(folder, file));
    }
  }
  return undefined;
}
