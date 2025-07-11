/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export const sync = (component: string, options: { interactive: boolean; all: boolean }) => {
  if (options.interactive) {
    console.log('Sync command executed in interactive mode');
  } else if (options.all) {
    console.log('Syncing all materials');
  } else if (component) {
    console.log(`Syncing component: ${component}`);
  } else {
    console.log('Sync command executed');
  }
};
