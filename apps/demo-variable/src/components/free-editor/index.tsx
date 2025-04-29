import {
  EditorRenderer,
  FlowNodeRegistry,
  FreeLayoutEditorProvider,
  Plugin,
  WorkflowJSON,
} from '@flowgram.ai/free-layout-editor';

import { DEFAULT_DEMO_REGISTRY } from './node-registries';
import { DEFAULT_INITIAL_DATA } from './initial-data';
import { useEditorProps } from './hooks/use-editor-props';
import './index.css';

interface FreeEditorProps {
  registries?: FlowNodeRegistry[];
  initialData?: WorkflowJSON;
  plugins?: Plugin[];
}

export const FreeEditor = ({
  registries = [DEFAULT_DEMO_REGISTRY],
  initialData = DEFAULT_INITIAL_DATA,
  plugins = [],
}: FreeEditorProps) => {
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
