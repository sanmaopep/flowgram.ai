/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';
import { CodeEditor } from '@flowgram.ai/form-materials';

import { useEditorProps } from './hooks/use-editor-props';
import { Tools } from './components/tools';
import { NodeAddPanel } from './components/node-add-panel';
import { Minimap } from './components/minimap';

import '@flowgram.ai/free-layout-editor/index.css';
import './index.css';

const defaultCode = `// Here, you can retrieve input variables from the node using 'params' and output results using 'ret'.
// 'params' has been correctly injected into the environment.
// Here's an example of getting the value of the parameter named 'input' from the node input:
// const input = params.input;
// Here's an example of outputting a 'ret' object containing multiple data types:
// const ret = { "name": 'Xiaoming', "hobbies": ["Reading", "Traveling"] };

async function main({ params }) {
  // Build the output object
  const ret = {
      "key0": params.input + params.input, // Concatenate the input parameter 'input' twice
      "key1": ["hello", "world"], // Output an array
      "key2": { // Output an Object
          "key21": "hi"
      },
  };

  return ret;
}`;

export const Editor = () => {
  const editorProps = useEditorProps();
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <div className="demo-free-container">
        <div className="demo-free-layout">
          <NodeAddPanel />
          <EditorRenderer className="demo-free-editor" />
        </div>
        <Tools />
        <Minimap />
        <CodeEditor value={defaultCode} languageId="typescript" />
      </div>
    </FreeLayoutEditorProvider>
  );
};
