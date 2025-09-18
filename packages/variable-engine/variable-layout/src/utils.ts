/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeEntity } from '@flowgram.ai/document';

import { FlowNodeVariableData } from './flow-node-variable-data';

/**
 * Use `node.scope` instead
 * @deprecated
 * @param node
 */
export function getNodeScope(node: FlowNodeEntity) {
  return node.getData(FlowNodeVariableData).public;
}

/**
 * Use `node.privateScope` instead
 * @deprecated
 * @param node
 */
export function getNodePrivateScope(node: FlowNodeEntity) {
  return node.getData(FlowNodeVariableData).initPrivate();
}
