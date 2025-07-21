/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { PropsType } from './types';
import { DynamicValueInput } from '../dynamic-value-input';

export function InputsValues(props: PropsType) {
  return (
    <div>
      InputsValues: {JSON.stringify(props)}
      <DynamicValueInput />
    </div>
  );
}
