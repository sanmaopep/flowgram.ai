/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from 'inversify';

import { IJsonSchema, JsonSchemaTypeRegistry, JsonSchemaTypeRegistryCreator } from './types';
import { defaultTypeDefinitionRegistry } from './type-definition/default';
import { BaseTypeManager } from '../base';
import {
  arrayRegistryCreator,
  booleanRegistryCreator,
  integerRegistryCreator,
  mapRegistryCreator,
  numberRegistryCreator,
  objectRegistryCreator,
  stringRegistryCreator,
  unknownRegistryCreator,
} from './type-definition';

@injectable()
export class JsonSchemaTypeManager<
  Schema extends Partial<IJsonSchema> = IJsonSchema,
  Registry extends JsonSchemaTypeRegistry<Schema> = JsonSchemaTypeRegistry<Schema>
> extends BaseTypeManager<Schema, Registry, JsonSchemaTypeManager<Schema, Registry>> {
  /**
   * get type name
   * @param typeSchema
   * @returns
   */
  protected getTypeNameFromSchema(typeSchema: Schema): string {
    if (!typeSchema) {
      return 'unknown';
    }
    if (typeSchema.enum) {
      return 'enum';
    }

    return typeSchema.type || typeSchema.$ref || 'unknown';
  }

  constructor() {
    super();

    const registries = [
      defaultTypeDefinitionRegistry,
      stringRegistryCreator,
      numberRegistryCreator,
      integerRegistryCreator,
      booleanRegistryCreator,
      objectRegistryCreator,
      arrayRegistryCreator,
      unknownRegistryCreator,
      mapRegistryCreator,
    ];

    registries.forEach((registry) => {
      this.register(
        registry as unknown as JsonSchemaTypeRegistryCreator<
          Schema,
          Registry,
          JsonSchemaTypeManager<Schema, Registry>
        >
      );
    });
  }

  /**
   * 根据当前的 parentType 获取 TypeRegistries
   */
  public getTypeRegistriesWithParentType = (parentType = ''): Registry[] =>
    this.getAllTypeRegistries()
      .filter((v) => v.type !== 'default')
      .filter((v) => !v.parentType || v.parentType.includes(parentType));

  /**
   * 获取字段的最深子字段
   * Array<Array<String>> -> String
   */
  getTypeSchemaDeepChildField = (type: Schema) => {
    let registry = this.getTypeBySchema(type);

    let childType = type;

    while (registry?.getItemType && registry.getItemType(childType)) {
      childType = registry.getItemType(childType)!;
      registry = this.getTypeBySchema(childType);
    }

    return childType;
  };

  /**
   * 获取 type schema 纯文本展示字符串，例如：
   * Array<Array<String>>，Map<String，Number>
   */
  getComplexText = (type: Schema): string => {
    const registry = this.getTypeBySchema(type);

    if (registry?.customComplexText) {
      return registry.customComplexText(type);
    }

    if (registry?.container && type.items) {
      return `${registry.label}<${this.getComplexText(type.items as Schema)}>`;
    } else if (registry?.container && type.additionalProperties) {
      return `${registry.label}<String, ${this.getComplexText(
        type.additionalProperties as Schema
      )}>`;
    } else {
      return registry?.label || type.type || 'unknown';
    }
  };
}
