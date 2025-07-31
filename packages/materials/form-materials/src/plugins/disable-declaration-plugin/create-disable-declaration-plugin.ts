/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTMatch, definePluginCreator, VariableEngine } from '@flowgram.ai/editor';

export const createDisableDeclarationPlugin = definePluginCreator<void>({
  onInit(ctx) {
    ctx.get(VariableEngine).onGlobalEvent('NewAST', (action) => {
      if (ASTMatch.isVariableDeclaration(action.ast)) {
        action.ast.updateMeta({
          ...(action.ast.meta || {}),
          disabled: true,
        });
      }
    });
  },
});
