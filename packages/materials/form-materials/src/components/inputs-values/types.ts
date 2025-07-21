/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Strategy } from '../constant-input/types';
import { IFlowValue } from '../../typings';

export interface PropsType {
  value?: Record<string, IFlowValue | undefined>;
  onChange: (value?: Record<string, IFlowValue | undefined>) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
  constantProps?: {
    strategies?: Strategy[];
    [key: string]: any;
  };
}
