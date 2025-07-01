import { BaseVariableField, GlobalScope, useService } from '@flowgram.ai/free-layout-editor';
import { JsonSchemaEditor, JsonSchemaUtils } from '@flowgram.ai/form-materials';

export function GlobalVariableEditor() {
  const globalScope = useService(GlobalScope);

  const globalVar = globalScope.getVar() as BaseVariableField;

  const value = globalVar.type ? JsonSchemaUtils.astToSchema(globalVar.type) : { type: 'object' };

  return (
    <JsonSchemaEditor
      value={value}
      onChange={(_schema) => globalVar.updateType(JsonSchemaUtils.schemaToAST(_schema))}
    />
  );
}
