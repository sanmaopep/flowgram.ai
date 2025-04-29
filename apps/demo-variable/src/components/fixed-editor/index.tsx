import {
  EditorRenderer,
  FlowNodeRegistry,
  FixedLayoutEditorProvider,
  Plugin,
  FlowDocumentJSON,
} from '@flowgram.ai/fixed-layout-editor';

import { DEFAULT_INITIAL_DATA } from './initial-data';
import { useEditorProps } from './hooks/use-editor-props';
import '@flowgram.ai/free-layout-editor/index.css';
import './index.css';

interface FixedEditorProps {
  registries?: FlowNodeRegistry[];
  initialData?: FlowDocumentJSON;
  plugins?: Plugin[];
}

export const FixedEditor = ({
  registries = [],
  initialData = DEFAULT_INITIAL_DATA,
  plugins = [],
}: FixedEditorProps) => {
  const editorProps = useEditorProps({ registries, initialData, plugins });
  return (
    <FixedLayoutEditorProvider {...editorProps}>
      <div className="demo-fixed-container">
        <div className="demo-fixed-layout">
          <EditorRenderer className="demo-fixed-editor" />
        </div>
      </div>
    </FixedLayoutEditorProvider>
  );
};
