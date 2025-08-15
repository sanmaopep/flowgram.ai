/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo, useState } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';
import { Button, Checkbox, IconButton } from '@douyinfe/semi-ui';
import {
  IconExpand,
  IconShrink,
  IconPlus,
  IconChevronDown,
  IconChevronRight,
  IconMinus,
} from '@douyinfe/semi-icons';

import { InjectTypeSelector } from '@/components/type-selector';
import { BlurInput } from '@/components/blur-input';

import { ConfigType, PropertyValueType } from './types';
import {
  IconAddChildren,
  UIActions,
  UICollapseTrigger,
  UICollapsible,
  UIContainer,
  UIExpandDetail,
  UILabel,
  UIProperties,
  UIPropertyLeft,
  UIPropertyMain,
  UIPropertyRight,
  UIRequired,
  UIType,
} from './styles';
import { UIName } from './styles';
import { DefaultValueWrapper, UIRow } from './styles';
import { usePropertiesEdit } from './hooks';
import { DefaultValue } from './default-value';

const DEFAULT = { type: 'object' };

export function JsonSchemaEditor(props: {
  value?: IJsonSchema;
  onChange?: (value: IJsonSchema) => void;
  config?: ConfigType;
  className?: string;
  readonly?: boolean;
}) {
  const { value = DEFAULT, config = {}, onChange: onChangeProps, readonly } = props;
  const { propertyList, onAddProperty, onRemoveProperty, onEditProperty } = usePropertiesEdit(
    value,
    onChangeProps
  );

  return (
    <UIContainer className={props.className}>
      <UIProperties>
        {propertyList.map((_property, index) => (
          <PropertyEdit
            readonly={readonly}
            key={_property.key}
            value={_property}
            config={config}
            $index={index}
            onChange={(_v) => {
              onEditProperty(_property.key!, _v);
            }}
            onRemove={() => {
              onRemoveProperty(_property.key!);
            }}
          />
        ))}
      </UIProperties>
      <Button
        disabled={readonly}
        size="small"
        style={{ marginTop: 10, marginLeft: 16 }}
        icon={<IconPlus />}
        onClick={onAddProperty}
      >
        {config?.addButtonText ?? I18n.t('Add')}
      </Button>
    </UIContainer>
  );
}

function PropertyEdit(props: {
  value?: PropertyValueType;
  config?: ConfigType;
  onChange?: (value: PropertyValueType) => void;
  onRemove?: () => void;
  readonly?: boolean;
  $isLast?: boolean;
  $index?: number;
  $isFirst?: boolean;
  $parentExpand?: boolean;
  $parentType?: string;
  $showLine?: boolean;
  $level?: number; // 添加层级属性
}) {
  const {
    value,
    config,
    readonly,
    $level = 0,
    onChange: onChangeProps,
    onRemove,
    $index,
    $isFirst,
    $isLast,
    $parentExpand = false,
    $parentType = '',
    $showLine,
  } = props;

  const [expand, setExpand] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const { name, type, items, default: defaultValue, description, isPropertyRequired } = value || {};

  const typeSelectorValue = useMemo(() => ({ type, items }), [type, items]);

  const { propertyList, canAddField, onAddProperty, onRemoveProperty, onEditProperty } =
    usePropertiesEdit(value, onChangeProps);

  const onChange = (key: string, _value: any) => {
    onChangeProps?.({
      ...(value || {}),
      [key]: _value,
    });
  };

  const showCollapse = canAddField && propertyList.length > 0;

  return (
    <>
      <UIPropertyLeft
        type={type}
        $index={$index}
        $isFirst={$isFirst}
        $isLast={$isLast}
        $showLine={$showLine}
        $isExpand={expand}
        $parentExpand={$parentExpand}
        $parentType={$parentType}
      >
        {showCollapse && (
          <UICollapseTrigger onClick={() => setCollapse((_collapse) => !_collapse)}>
            {collapse ? <IconChevronDown size="small" /> : <IconChevronRight size="small" />}
          </UICollapseTrigger>
        )}
      </UIPropertyLeft>
      <UIPropertyRight>
        <UIPropertyMain
          $showCollapse={showCollapse}
          $collapse={collapse}
          $expand={expand}
          type={type}
        >
          <UIRow>
            <UIName>
              <BlurInput
                disabled={readonly}
                placeholder={config?.placeholder ?? 'Input Variable Name'}
                size="small"
                value={name}
                onChange={(value) => onChange('name', value)}
              />
            </UIName>
            <UIType>
              <InjectTypeSelector
                value={typeSelectorValue}
                readonly={readonly}
                onChange={(_value) => {
                  onChangeProps?.({
                    ...(value || {}),
                    ..._value,
                  });
                }}
              />
            </UIType>
            <UIRequired>
              <Checkbox
                disabled={readonly}
                checked={isPropertyRequired}
                onChange={(e) => onChange('isPropertyRequired', e.target.checked)}
              />
            </UIRequired>
            <UIActions>
              <IconButton
                disabled={readonly}
                size="small"
                theme="borderless"
                icon={expand ? <IconShrink size="small" /> : <IconExpand size="small" />}
                onClick={() => {
                  setExpand((_expand) => !_expand);
                }}
              />
              {canAddField && (
                <IconButton
                  disabled={readonly}
                  size="small"
                  theme="borderless"
                  icon={<IconAddChildren />}
                  onClick={() => {
                    onAddProperty();
                    setCollapse(true);
                  }}
                />
              )}
              <IconButton
                disabled={readonly}
                size="small"
                theme="borderless"
                icon={<IconMinus size="small" />}
                onClick={onRemove}
              />
            </UIActions>
          </UIRow>
          {expand && (
            <UIExpandDetail>
              <UILabel>{config?.descTitle ?? I18n.t('Description')}</UILabel>
              <BlurInput
                disabled={readonly}
                size="small"
                value={description}
                onChange={(value) => onChange('description', value)}
                placeholder={
                  config?.descPlaceholder ?? I18n.t('Help LLM to understand the property')
                }
              />
              {$level === 0 && (
                <>
                  <UILabel style={{ marginTop: 10 }}>
                    {config?.defaultValueTitle ?? I18n.t('Default Value')}
                  </UILabel>
                  <DefaultValueWrapper>
                    <DefaultValue
                      value={defaultValue}
                      schema={value}
                      placeholder={config?.defaultValuePlaceholder ?? I18n.t('Default Value')}
                      onChange={(value) => onChange('default', value)}
                    />
                  </DefaultValueWrapper>
                </>
              )}
            </UIExpandDetail>
          )}
        </UIPropertyMain>
        {showCollapse && (
          <UICollapsible $collapse={collapse}>
            <UIProperties $shrink={true}>
              {propertyList.map((_property, index) => (
                <PropertyEdit
                  readonly={readonly}
                  key={_property.key}
                  value={_property}
                  config={config}
                  $level={$level + 1} // 传递递增的层级
                  $parentExpand={expand}
                  $parentType={type}
                  onChange={(_v) => {
                    onEditProperty(_property.key!, _v);
                  }}
                  onRemove={() => {
                    onRemoveProperty(_property.key!);
                  }}
                  $isLast={index === propertyList.length - 1}
                  $isFirst={index === 0}
                  $index={index}
                  $showLine={true}
                />
              ))}
            </UIProperties>
          </UICollapsible>
        )}
      </UIPropertyRight>
    </>
  );
}
