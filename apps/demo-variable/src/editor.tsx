import {
  EditorRenderer,
  FlowNodeRegistry,
  FreeLayoutEditorProvider,
  Plugin,
  WorkflowJSON,
} from '@flowgram.ai/free-layout-editor';

import { useEditorProps } from './hooks/use-editor-props';
import '@flowgram.ai/free-layout-editor/index.css';
import './index.css';
interface EditorProps {
  registries?: FlowNodeRegistry[];
  initialData?: WorkflowJSON;
  plugins?: Plugin[];
}

export const Editor = ({ registries = [], initialData, plugins = [] }: EditorProps) => {
  const editorProps = useEditorProps({ registries, initialData, plugins });
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <div className="demo-free-container">
        <div className="demo-free-layout">
          <EditorRenderer className="demo-free-editor" />
        </div>
      </div>
    </FreeLayoutEditorProvider>
  );
};
