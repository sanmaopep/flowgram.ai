/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema, JsonSchemaTypeManager } from '@flowgram.ai/json-schema';
import { definePluginCreator } from '@flowgram.ai/editor';

import { jsonSchemaTypePreset } from './type-definition';
import { JsonSchemaTypeRegistry } from './manager';

export const TypeManager = Symbol('TypeManager');
type TypeManager = JsonSchemaTypeManager<IJsonSchema, JsonSchemaTypeRegistry>;

export const createTypePresetPlugin = definePluginCreator<{ types: JsonSchemaTypeRegistry[] }>({
  onBind({ bind }) {
    bind(TypeManager).to(JsonSchemaTypeManager).inSingletonScope();
  },
  onInit(ctx, opts) {
    const typeManager: TypeManager = ctx.get(TypeManager);
    jsonSchemaTypePreset.forEach((_type) => typeManager.register(_type));

    opts.types.forEach((_type) => typeManager.register(_type));
  },
});
