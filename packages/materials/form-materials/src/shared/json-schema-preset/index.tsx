/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import React from 'react';

import {
  type IJsonSchema,
  JsonSchemaUtils,
  useTypeManager as useOriginTypeManager,
  TypePresetProvider as OriginTypePresetProvider,
  JsonSchemaTypeManager,
} from '@flowgram.ai/json-schema';
import { usePlaygroundContainer } from '@flowgram.ai/editor';

import { jsonSchemaTypePreset } from './type-definition';
import { type JsonSchemaTypeRegistry, type ConstantRendererProps } from './manager';
import { createTypePresetPlugin, TypeManager } from './create-type-preset-plugin';

const useTypeManager = () => {
  const container = usePlaygroundContainer();

  // Get TypeManager from container
  const typeManager = useOriginTypeManager<JsonSchemaTypeRegistry>(
    container?.isBound(TypeManager) ? container.get(TypeManager) : undefined
  );

  return typeManager as JsonSchemaTypeManager<IJsonSchema, JsonSchemaTypeRegistry>;
};

const JsonSchemaTypePresetProvider = ({
  types = [],
  children,
}: React.PropsWithChildren<{ types: JsonSchemaTypeRegistry[] }>) => (
  <OriginTypePresetProvider types={[...jsonSchemaTypePreset, ...types]}>
    {children}
  </OriginTypePresetProvider>
);

export {
  createTypePresetPlugin,
  useTypeManager,
  JsonSchemaTypePresetProvider,
  IJsonSchema,
  JsonSchemaUtils,
  JsonSchemaTypeRegistry,
  ConstantRendererProps,
};
