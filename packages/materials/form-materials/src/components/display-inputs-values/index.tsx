/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { isPlainObject } from 'lodash';
import { useScopeAvailable } from '@flowgram.ai/editor';

import { FlowValueUtils } from '@/shared';
import { DisplayFlowValue } from '@/components/display-flow-value';

import { DisplayInputsWrapper } from './styles';
import { DisplaySchemaTag } from '../display-schema-tag';

interface PropsType {
  value?: any;
  showIconInTree?: boolean;
}

export function DisplayInputsValues({ value, showIconInTree }: PropsType) {
  const childEntries = Object.entries(value || {});

  return (
    <DisplayInputsWrapper>
      {childEntries.map(([key, value]) => {
        if (FlowValueUtils.isFlowValue(value)) {
          return (
            <DisplayFlowValue key={key} title={key} value={value} showIconInTree={showIconInTree} />
          );
        }

        if (isPlainObject(value)) {
          return (
            <DisplayInputsValueAllInTag
              key={key}
              title={key}
              value={value}
              showIconInTree={showIconInTree}
            />
          );
        }

        return null;
      })}
    </DisplayInputsWrapper>
  );
}

export function DisplayInputsValueAllInTag({
  value,
  title,
  showIconInTree,
}: PropsType & {
  title: string;
}) {
  const available = useScopeAvailable();

  const schema = useMemo(
    () => FlowValueUtils.inferJsonSchema(value, available.scope),
    [available.version, value]
  );

  return <DisplaySchemaTag title={title} value={schema} showIconInTree={showIconInTree} />;
}
