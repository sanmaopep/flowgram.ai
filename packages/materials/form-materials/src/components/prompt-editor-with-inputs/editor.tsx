/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { PromptEditor, PromptEditorPropsType } from '@/components/prompt-editor';
import { EditorInputsTree } from '@/components/coze-editor-extensions';

export interface PromptEditorWithInputsProps extends PromptEditorPropsType {
  inputsValues: any;
}

export function PromptEditorWithInputs({
  inputsValues,
  ...restProps
}: PromptEditorWithInputsProps) {
  return (
    <PromptEditor {...restProps}>
      <EditorInputsTree inputsValues={inputsValues} />
    </PromptEditor>
  );
}
