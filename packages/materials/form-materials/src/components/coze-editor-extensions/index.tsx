/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazy } from 'react';

export const EditorVariableTree = lazy(() =>
  import('./extensions/variable-tree').then((module) => ({ default: module.VariableTree }))
);

export const EditorVariableTagInject = lazy(() =>
  import('./extensions/variable-tag').then((module) => ({ default: module.VariableTagInject }))
);

export const EditorInputsTree = lazy(() =>
  import('./extensions/inputs-tree').then((module) => ({ default: module.InputsTree }))
);
