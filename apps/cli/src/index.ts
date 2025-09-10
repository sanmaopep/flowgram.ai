/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';

import { Command } from 'commander';

import { updateFlowgramVersion } from './update-version';
import { syncMaterial } from './materials';
import { createApp } from './create-app';

const program = new Command();

program.name('flowgram-cli').version('1.0.0').description('Flowgram CLI');

program
  .command('create-app')
  .description('Create a new flowgram project')
  .argument('[string]', 'Project name')
  .action(async (projectName) => {
    await createApp(projectName);
  });

program
  .command('materials')
  .description('Sync materials to the project')
  .argument('[string]', 'Material name')
  .option('--refresh-project-imports', 'Refresh project imports to copied materials', false)
  .option('--target-material-root-dir', 'Target directory to copy materials')
  .action(async (materialName, options) => {
    await syncMaterial({
      materialName,
      refreshProjectImports: options.refreshProjectImports,
      targetMaterialRootDir: options.targetMaterialRootDir
        ? path.join(process.cwd(), options.targetMaterialRootDir)
        : undefined,
    });
  });

program
  .command('update-version')
  .description('Update flowgram version in the project')
  .argument('[string]', 'Flowgram version')
  .action(async (version) => {
    await updateFlowgramVersion(version);
  });

program.parse(process.argv);
