/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IconButton } from '@douyinfe/semi-ui';
import { IconMinus } from '@douyinfe/semi-icons';

import { IFlowConstantRefValue } from '@/typings';

import { AssignRowProps } from './types';
import { BlurInput } from './components/blur-input';
import { VariableSelector } from '../variable-selector';
import { DynamicValueInput } from '../dynamic-value-input';

export function AssignRow(props: AssignRowProps) {
  const {
    value = {
      operator: 'assign',
    },
    onChange,
    onDelete,
    readonly,
  } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 150, minWidth: 150, maxWidth: 150 }}>
        {value?.operator === 'assign' ? (
          <VariableSelector
            style={{ width: '100%', height: 26 }}
            value={value?.left?.content}
            config={{ placeholder: 'Select Left' }}
            onChange={(v) =>
              onChange?.({
                ...value,
                left: { type: 'ref', content: v },
              })
            }
          />
        ) : (
          <BlurInput
            style={{ height: 26 }}
            size="small"
            placeholder="Input Name"
            value={value?.left}
            onChange={(v) =>
              onChange?.({
                ...value,
                left: v,
              })
            }
          />
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        <DynamicValueInput
          readonly={readonly}
          value={value?.right as IFlowConstantRefValue | undefined}
          onChange={(v) =>
            onChange?.({
              ...value,
              right: v,
            })
          }
        />
      </div>
      {onDelete && (
        <div>
          <IconButton
            size="small"
            theme="borderless"
            icon={<IconMinus />}
            onClick={() => onDelete?.()}
          />
        </div>
      )}
    </div>
  );
}

export { AssignValueType } from './types';
