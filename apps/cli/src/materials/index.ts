/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';

import inquirer from 'inquirer';
import chalk from 'chalk';

import { Project } from '../utils/project';
import { loadNpm } from '../utils/npm';
import { MaterialCliOptions, SyncMaterialContext } from './types';
import { executeRefreshProjectImport } from './refresh-project-import';
import { Material } from './material';
import { copyMaterials } from './copy';

export async function syncMaterial(cliOpts: MaterialCliOptions) {
  const { materialName, refreshProjectImports, targetMaterialRootDir } = cliOpts;

  // materialName can be undefined
  console.log(chalk.bold('🚀 Welcome to @flowgram.ai form-materials!'));

  const project = await Project.getSingleton();
  project.printInfo();

  if (!project.flowgramVersion) {
    throw new Error(
      chalk.red(
        '❌ Please install @flowgram.ai/fixed-layout-editor or @flowgram.ai/free-layout-editor'
      )
    );
  }

  const formMaterialPkg = await loadNpm('@flowgram.ai/form-materials');

  const materials: Material[] = Material.listAll(formMaterialPkg);

  let material: Material | undefined; // material can be undefined

  // 1. Check if materialName is provided and exists in materials
  if (materialName) {
    const selectedMaterial = materials.find((m) => `${m.type}/${m.name}` === materialName);
    if (selectedMaterial) {
      material = selectedMaterial;
      console.log(chalk.green(`Using material: ${materialName}`));
    } else {
      console.log(
        chalk.yellow(`Material "${materialName}" not found. Please select from the list:`)
      );
    }
  }

  // 2. If material not found or materialName not provided, prompt user to select
  if (!material) {
    // User select one component
    const result = await inquirer.prompt<{
      material: Material; // Specify type for prompt result
    }>([
      {
        type: 'list',
        name: 'material',
        message: 'Select one material to add:',
        choices: [
          ...materials.map((_material) => ({
            name: `${_material.type}/${_material.name}`,
            value: _material,
          })),
        ],
      },
    ]);
    material = result.material;
  }
  // Ensure material is defined before proceeding
  if (!material) {
    console.error(chalk.red('No material selected. Exiting.'));
    process.exit(1);
  }

  // where to place all material in target project
  const targetFormMaterialRoot =
    targetMaterialRootDir || path.join(project.projectPath, 'src', 'form-materials');

  const context: SyncMaterialContext = {
    selectedMaterials: [material],
    project,
    formMaterialPkg,
    cliOpts,
    targetFormMaterialRoot,
  };

  // 3. Refresh project imports
  if (refreshProjectImports) {
    console.log(chalk.bold('🚀 Refresh imports in your project'));
    executeRefreshProjectImport(context);
  }

  // 4. Copy the materials to the project
  console.log(chalk.bold('🚀 The following materials will be added to your project'));
  console.log(material);
  let { packagesToInstall } = copyMaterials(context);

  // 4. Install the dependencies
  await project.addDependencies(packagesToInstall);
  console.log(chalk.bold('✅ These npm dependencies is added to your package.json'));
  packagesToInstall.forEach((_package) => {
    console.log(`- ${_package}`);
  });
  console.log(chalk.bold('\n➡️ Please run npm install to install dependencies\n'));
}
