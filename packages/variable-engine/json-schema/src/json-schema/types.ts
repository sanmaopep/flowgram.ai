/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { BaseTypeRegistry, TypeRegistryCreator } from '../base';
import { type JsonSchemaTypeManager } from './json-schema-type-manager';

export type JsonSchemaBasicType =
  | 'boolean'
  | 'string'
  | 'integer'
  | 'number'
  | 'object'
  | 'array'
  | 'map';

export interface IJsonSchema<T = string> {
  type?: T;
  default?: any;
  title?: string;
  description?: string;
  enum?: (string | number)[];
  properties?: Record<string, IJsonSchema<T>>;
  additionalProperties?: IJsonSchema<T>;
  items?: IJsonSchema<T>;
  required?: string[];
  $ref?: string;
  extra?: {
    index?: number;
    // Used in BaseType.isEqualWithJSONSchema, the type comparison will be weak
    weak?: boolean;
    // Set the render component
    formComponent?: string;
    [key: string]: any;
  };
}

export type IBasicJsonSchema = IJsonSchema<JsonSchemaBasicType>;

/**
 * 基于 IJsonSchema 的 TypeRegistry
 */
export interface JsonSchemaTypeRegistry<Schema extends Partial<IJsonSchema> = IJsonSchema>
  extends BaseTypeRegistry {
  /**
   * 该类型 icon
   */
  icon: React.JSX.Element;
  /**
   * 该类型展示文本，不包含 icon
   */
  label: string;
  /**
   * 是否是容器类型
   */
  container: boolean;
  /**
   * 支持的父类型，部分类型在类型选择中仅能作为子类型出现，而不能作为的基本类型出现
   */
  parentType?: string[];

  /*
   * 获取支持的子类型
   */
  getSupportedItemTypes?: (ctx: {
    level: number;
    parentTypes?: string[];
  }) => Array<{ type: string; disabled?: string }>;

  /**
   * 获取展示 label
   */
  getDisplayLabel: (typeSchema: Schema) => React.JSX.Element;
  /**
   * 获取 展示 text
   */
  getDisplayText: (typeSchema: Schema) => string | undefined;
  /**
   * 获取子类型
   */
  getItemType?: (typeSchema: Schema) => Schema | undefined;

  /**
   * 生成 default Schema
   */
  getDefaultSchema: () => Schema;

  /**
   * onInit 初始化逻辑，在外部合适的时机调用，将数据注册到类型系统之中
   */
  onInit?: () => void;

  /**
   * 是否允许添加字段，例如 object
   */
  canAddField: (typeSchema: Schema) => boolean;

  /**
   * 获取 string 的 value，比如
   *  { type: "array", items: { type: "string" } }
   *  值为 "array-string"
   *
   * 使用场景为，在一些 ui 组件中，需要生成 string value
   */
  getStringValueByTypeSchema?: (optionValue: Schema) => string | undefined;

  /**
   * 将 string value 还原成 typeSchema
   * "array-string" 还原为
   *  { type: "array", items: { type: "string" } }
   */
  getTypeSchemaByStringValue?: (type: string) => Schema;

  /**
   * 获取展示用的 icon，array 的 复合 icon 也有处理
   */
  getDisplayIcon: (typeSchema: Schema) => JSX.Element;

  /**
   * 获取子属性
   */
  getTypeSchemaProperties: (typeSchema: Schema) => Record<string, Schema> | undefined;

  /**
   * 获取默认值
   */
  getDefaultValue: () => unknown;

  /**
   * 根据值获取展示的文本
   */
  getValueText: (value?: unknown) => string;
  /**
   * 获取某个类型在 flow schema 的 json path
   * 比如
   * { type: "object", properties: { name: { type: "string" } } }
   * -> ['properties', 'name']
   * { type: "array", items: { type: "string" } }
   * ->['items']
   */
  getJsonPaths: (typeSchema: Schema) => string[];

  /**
   * 获取子字段的父节点
   * object 是自身
   * array<object> 是 items
   * map<object> 是 additionalProperties
   */
  getPropertiesParent: (typeSchema: Schema) => Schema | undefined;
  /**
   * 自定义类型的 complexText
   * 比如 Array<string>，可以进行修改
   */
  customComplexText?: (typeSchema: Schema) => string;
}

export type JsonSchemaTypeRegistryCreator<
  Schema extends Partial<IJsonSchema> = IJsonSchema,
  Registry extends JsonSchemaTypeRegistry<Schema> = JsonSchemaTypeRegistry<Schema>,
  Manager extends JsonSchemaTypeManager<Schema, Registry> = JsonSchemaTypeManager<Schema, Registry>
> = TypeRegistryCreator<Registry, Manager>;
