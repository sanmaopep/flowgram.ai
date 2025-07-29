/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  type IJsonSchema,
  JsonSchemaTypeManager,
  jsonSchemaTypeManager as originJsonSchemaTypeManager,
} from '@flowgram.ai/json-schema';
import { JsonSchemaTypeRegistry as OriginJsonSchemaTypeRegistry } from '@flowgram.ai/json-schema';

export interface ConstantRendererProps<Value = any> {
  value?: Value;
  onChange?: (value: Value) => void;
  readonly?: boolean;
}
export interface JsonSchemaTypeRegistry<Value = any> extends OriginJsonSchemaTypeRegistry {
  /**
   * Render Constant Input
   */
  ConstantRenderer: React.FC<ConstantRendererProps<Value>>;
}

export const jsonSchemaTypeManager: JsonSchemaTypeManager<IJsonSchema, JsonSchemaTypeRegistry> =
  originJsonSchemaTypeManager as unknown as JsonSchemaTypeManager<
    IJsonSchema,
    JsonSchemaTypeRegistry
  >;
