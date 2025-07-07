/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useRef } from 'react';

import { createRenderer, EditorProvider } from '@coze-editor/editor/react';
import preset, { type EditorAPI } from '@coze-editor/editor/preset-code';
import { EditorView } from '@codemirror/view';

import './theme';
import './language-features';
import { getSuffixByLanguageId } from './utils';

const OriginCodeEditor = createRenderer(preset, [
  EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
    },
  }),
]);

export interface CodeEditorProps extends React.PropsWithChildren<{}> {
  value?: string;
  onChange?: (value: string) => void;
  languageId: 'python' | 'typescript' | 'shell' | 'json';
  theme: 'dark' | 'light';
}

export function CodeEditor({
  value,
  onChange,
  languageId = 'python',
  theme = 'dark',
  children,
}: CodeEditorProps) {
  const editorRef = useRef<EditorAPI | null>(null);

  return (
    <EditorProvider>
      <OriginCodeEditor
        defaultValue={value}
        options={{
          uri: `file:///untitled${getSuffixByLanguageId(languageId)}`,
          languageId,
          theme,
        }}
        didMount={(editor: EditorAPI) => {
          editorRef.current = editor;
        }}
        onChange={(e) => onChange?.(e.value)}
      >
        {children}
      </OriginCodeEditor>
    </EditorProvider>
  );
}
