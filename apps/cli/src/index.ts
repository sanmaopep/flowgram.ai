#!/usr/bin/env node

import { Command } from 'commander';
import { sync } from './commands/sync.js';
import { create } from './commands/create.js';

const program = new Command();

program
  .name('flowgram-cli')
  .description('A CLI tool to manage Project with flowgram')
  .version('0.1.8');

program
  .command('sync [component]')
  .description('Sync with flowgram')
  .option('-i, --interactive', 'Interactive mode')
  .option('-a, --all', 'Sync all materials')
  .action(sync);

program
  .command('create-app')
  .description('Create a new project')
  .action(create);

program
  .command('init-config')
  .description('Init flowgram.config.json')
  .action(create);

program.parse(process.argv);
