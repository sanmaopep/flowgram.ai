/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { DatePicker } from '@douyinfe/semi-ui';

import { ConditionPresetOp } from '@/components/condition-context/op';

import { type JsonSchemaTypeRegistry } from '../types';

export const dateTimeRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'date-time',
  ConstantRenderer: (props) => (
    <DatePicker
      size="small"
      type="dateTime"
      density="compact"
      style={{ width: '100%', ...(props.style || {}) }}
      disabled={props.readonly}
      {...props}
    />
  ),
  conditionRule: {
    [ConditionPresetOp.EQ]: { type: 'date-time' },
    [ConditionPresetOp.NEQ]: { type: 'date-time' },
    [ConditionPresetOp.GT]: { type: 'date-time' },
    [ConditionPresetOp.GTE]: { type: 'date-time' },
    [ConditionPresetOp.LT]: { type: 'date-time' },
    [ConditionPresetOp.LTE]: { type: 'date-time' },
    [ConditionPresetOp.IS_EMPTY]: null,
    [ConditionPresetOp.IS_NOT_EMPTY]: null,
  },
};
