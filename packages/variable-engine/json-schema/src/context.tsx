/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useContext, useMemo } from 'react';

import {
  IJsonSchema,
  jsonSchemaTypeManager,
  JsonSchemaTypeManager,
  JsonSchemaTypeRegistry,
} from './json-schema';
import { TypeRegistryCreator } from './base';

// use global default
const TypePresetContext = createContext<JsonSchemaTypeManager | null>(null);

export const useTypeManager = <Registry extends JsonSchemaTypeRegistry = JsonSchemaTypeRegistry>(
  backupTypeManager?: JsonSchemaTypeManager<IJsonSchema, Registry>
) => {
  const typeManager = useContext(TypePresetContext);

  if (typeManager) {
    return typeManager;
  }

  if (backupTypeManager) {
    return backupTypeManager;
  }

  return jsonSchemaTypeManager;
};

export const TypePresetProvider = <
  Registry extends JsonSchemaTypeRegistry = JsonSchemaTypeRegistry
>({
  children,
  types,
}: React.PropsWithChildren<{
  types: (
    | Partial<Registry>
    | TypeRegistryCreator<Registry, JsonSchemaTypeManager<IJsonSchema, Registry>>
  )[];
}>) => {
  const schemaManager = useMemo(() => {
    const typeManager = new JsonSchemaTypeManager<IJsonSchema, Registry>();

    types.forEach((_type) => typeManager.register(_type));

    return typeManager;
  }, [...types]);

  return (
    <TypePresetContext.Provider value={schemaManager as unknown as JsonSchemaTypeManager}>
      {children}
    </TypePresetContext.Provider>
  );
};
