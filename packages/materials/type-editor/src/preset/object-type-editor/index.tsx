import React, { useMemo } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';

import { TypeEditorColumnType } from '../../types';
import { ToolbarKey, TypeEditor } from '../../components';

interface PropsType {
  value?: IJsonSchema;
  onChange?: (value?: IJsonSchema) => void;
  readonly?: boolean;
  config?: {
    rootKey?: string;
  };
}

export function ObjectTypeEditor(props: PropsType) {
  const { value, onChange, config, readonly } = props;

  const { rootKey = 'outputs' } = config || {};

  const wrapValue: IJsonSchema = useMemo(
    () => ({
      type: 'object',
      properties: { [rootKey]: value || { type: 'object' } },
    }),
    [value, rootKey]
  );

  return (
    <div>
      <TypeEditor
        readonly={readonly}
        mode="type-definition"
        toolbarConfig={[ToolbarKey.Import, ToolbarKey.UndoRedo]}
        rootLevel={1}
        value={wrapValue}
        onChange={(_v) => onChange?.(_v?.properties?.[rootKey])}
        onCustomSetValue={(newType) => ({
          type: 'object',
          properties: {
            [rootKey]: newType,
          },
        })}
        getRootSchema={(type) => type.properties![rootKey]}
        onEditRowDataSource={(dataSource) => {
          // 对于 output 特化处理，不允许该行编辑 key、required
          if (dataSource[0]) {
            dataSource[0].disableEditColumn = [
              {
                column: TypeEditorColumnType.Key,
                reason: 'This field is not editable.',
              },
              {
                column: TypeEditorColumnType.Type,
                reason: 'This field is not editable.',
              },
              {
                column: TypeEditorColumnType.Required,
                reason: 'This field is not editable.',
              },
              {
                column: TypeEditorColumnType.Default,
                reason: 'This field is not editable.',
              },
              {
                column: TypeEditorColumnType.Operate,
                reason: 'This field is not editable.',
              },
            ];

            dataSource[0].cannotDrag = true;
          }

          return dataSource;
        }}
      />
    </div>
  );
}
