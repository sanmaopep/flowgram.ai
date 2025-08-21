/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isNil } from 'lodash';
import { FeedbackLevel, FlowNodeEntity, getNodeScope } from '@flowgram.ai/editor';

import { IFlowValue } from '@/typings';
import { FlowValueUtils } from '@/shared';

interface Context {
  node: FlowNodeEntity;
  required?: boolean;
  errorMessages?: {
    required?: string;
    unknownVariable?: string;
  };
}

export function validateFlowValue(value: IFlowValue | undefined, ctx: Context) {
  const { node, required, errorMessages } = ctx;

  const {
    required: requiredMessage = 'Field is required',
    unknownVariable: unknownVariableMessage = 'Unknown Variable',
  } = errorMessages || {};

  if (required && (isNil(value) || isNil(value?.content) || value?.content === '')) {
    return {
      level: FeedbackLevel.Error,
      message: requiredMessage,
    };
  }

  if (value?.type === 'ref') {
    const variable = getNodeScope(node).available.getByKeyPath(value?.content || []);
    if (!variable) {
      return {
        level: FeedbackLevel.Error,
        message: unknownVariableMessage,
      };
    }
  }

  if (value?.type === 'template') {
    const allRefs = FlowValueUtils.getTemplateKeyPaths(value);

    for (const ref of allRefs) {
      const variable = getNodeScope(node).available.getByKeyPath(ref);
      if (!variable) {
        return {
          level: FeedbackLevel.Error,
          message: unknownVariableMessage,
        };
      }
    }
  }

  return undefined;
}
