/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Strategy } from '../constant-input/types';
import { IFlowConstantRefValue } from '../../typings';

export interface PropsType {
  value?: Record<string, IFlowConstantRefValue>;
  onChange: (value?: Record<string, IFlowConstantRefValue>) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
  constantProps?: {
    strategies?: Strategy[];
    [key: string]: any;
  };
}
