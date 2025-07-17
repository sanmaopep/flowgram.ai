/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconHTTP from '../../assets/icon-http.svg';

export const HTTPNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.HTTP,
  info: {
    icon: iconHTTP,
    description: 'Call the HTTP API',
  },
  meta: {
    size: {
      width: 360,
      height: 390,
    },
  },
  onAdd() {
    return {
      id: `http_${nanoid(5)}`,
      type: 'http',
      data: {},
    };
  },
};
