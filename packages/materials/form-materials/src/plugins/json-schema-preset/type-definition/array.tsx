/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { I18n } from '@flowgram.ai/editor';

import { ConditionPresetOp } from '@/components/condition-context/op';
import { CodeEditorMini } from '@/components/code-editor-mini';

import { type JsonSchemaTypeRegistry } from '../types';

export const arrayRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'array',
  ConstantRenderer: (props) => (
    <CodeEditorMini
      value={props.value}
      languageId="json"
      onChange={(v) => props.onChange?.(v)}
      placeholder={I18n.t('Please Input Array')}
      readonly={props.readonly}
    />
  ),
  conditionRule: {
    [ConditionPresetOp.IS_EMPTY]: null,
    [ConditionPresetOp.IS_NOT_EMPTY]: null,
    [ConditionPresetOp.CONTAINS]: { type: 'array', extra: { weak: true } },
    [ConditionPresetOp.NOT_CONTAINS]: { type: 'array', extra: { weak: true } },
    [ConditionPresetOp.EQ]: { type: 'array', extra: { weak: true } },
    [ConditionPresetOp.NEQ]: { type: 'array', extra: { weak: true } },
  },
};
