/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { JsonSchemaUtils, IJsonSchema } from '@flowgram.ai/json-schema';
import { IconButton } from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';

import { IFlowConstantRefValue } from '@/typings/flow-value';
import { VariableSelector } from '@/components/variable-selector';
import { TypeSelector } from '@/components/type-selector';
import { ConstantInput, ConstantInputStrategy } from '@/components/constant-input';

import { UIContainer, UIMain, UITrigger, UIType } from './styles';
import { useIncludeSchema, useRefVariable, useSelectSchema } from './hooks';

interface PropsType {
  value?: IFlowConstantRefValue;
  onChange: (value?: IFlowConstantRefValue) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
  schema?: IJsonSchema;
  constantProps?: {
    strategies?: ConstantInputStrategy[];
    schema?: IJsonSchema; // set schema of constant input only
    [key: string]: any;
  };
}

export function DynamicValueInput({
  value,
  onChange,
  readonly,
  style,
  schema: schemaFromProps,
  constantProps,
}: PropsType) {
  const refVariable = useRefVariable(value);
  const [selectSchema, setSelectSchema] = useSelectSchema(schemaFromProps, constantProps, value);
  const includeSchema = useIncludeSchema(schemaFromProps);

  const renderTypeSelector = () => {
    if (schemaFromProps) {
      return <TypeSelector value={schemaFromProps} readonly={true} />;
    }

    if (value?.type === 'ref') {
      const schema = refVariable?.type ? JsonSchemaUtils.astToSchema(refVariable?.type) : undefined;

      return <TypeSelector value={schema} readonly={true} />;
    }

    return (
      <TypeSelector
        value={selectSchema}
        onChange={(_v) => {
          setSelectSchema(_v || { type: 'string' });
          let content;

          if (_v?.type === 'object') {
            content = '{}';
          }

          if (_v?.type === 'array') {
            content = '[]';
          }

          if (_v?.type === 'boolean') {
            content = false;
          }

          onChange({
            type: 'constant',
            content,
            schema: _v || { type: 'string' },
          });
        }}
        readonly={readonly}
      />
    );
  };

  const renderMain = () => {
    if (value?.type === 'ref') {
      // Display Variable Or Delete
      return (
        <VariableSelector
          style={{ width: '100%' }}
          value={value?.content}
          onChange={(_v) => onChange(_v ? { type: 'ref', content: _v } : undefined)}
          includeSchema={includeSchema}
          readonly={readonly}
        />
      );
    }

    const constantSchema = schemaFromProps || selectSchema || { type: 'string' };

    return (
      <ConstantInput
        value={value?.content}
        onChange={(_v) => onChange({ type: 'constant', content: _v, schema: constantSchema })}
        schema={constantSchema || { type: 'string' }}
        readonly={readonly}
        strategies={[...(constantProps?.strategies || [])]}
        fallbackRenderer={() => (
          <VariableSelector
            style={{ width: '100%' }}
            onChange={(_v) => onChange(_v ? { type: 'ref', content: _v } : undefined)}
            includeSchema={includeSchema}
            readonly={readonly}
          />
        )}
        {...constantProps}
      />
    );
  };

  const renderTrigger = () => (
    <VariableSelector
      style={{ width: '100%' }}
      value={value?.type === 'ref' ? value?.content : undefined}
      onChange={(_v) => onChange({ type: 'ref', content: _v })}
      includeSchema={includeSchema}
      readonly={readonly}
      triggerRender={() => (
        <IconButton disabled={readonly} size="small" icon={<IconSetting size="small" />} />
      )}
    />
  );

  return (
    <UIContainer style={style}>
      <UIType>{renderTypeSelector()}</UIType>
      <UIMain>{renderMain()}</UIMain>
      <UITrigger>{renderTrigger()}</UITrigger>
    </UIContainer>
  );
}
