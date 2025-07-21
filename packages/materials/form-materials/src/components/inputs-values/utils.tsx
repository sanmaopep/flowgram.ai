/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isObject } from 'lodash';

import { IFlowConstantValue, IFlowRefValue, IFlowTemplateValue, IFlowValue } from '../../typings';

function isRef(value: any): value is IFlowRefValue {
  return (
    value?.type === 'ref' && Array.isArray(value?.content) && typeof value?.content[0] === 'string'
  );
}

function isTemplate(value: any): value is IFlowTemplateValue {
  return value?.type === 'template' && typeof value?.content === 'string';
}

function isConstant(value: any): value is IFlowConstantValue {
  return value?.type === 'constant' && typeof value?.content !== 'undefined';
}

export function isDrilldownObject(value: any): value is Record<string, IFlowValue | undefined> {
  return isObject(value) && !isRef(value) && !isTemplate(value) && !isConstant(value);
}
