/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IJsonSchema, JsonSchemaTypeManager } from '@flowgram.ai/json-schema';

import { useTypeManager } from '../../shared';
import { HorizontalLine, TreeItem, TreeLevel, TreeRow, TreeTitle } from './styles';

interface PropsType {
  value?: IJsonSchema;
  parentKey?: string;
  depth?: number;
  drilldown?: boolean;
  showIcon?: boolean;
  typeManager?: JsonSchemaTypeManager;
}

export function DisplaySchemaTree(props: Omit<PropsType, 'parentKey' | 'depth'>) {
  return <SchemaTree {...props} />;
}

function SchemaTree(props: PropsType) {
  const {
    value: schema = {},
    drilldown = true,
    depth = 0,
    showIcon = true,
    parentKey = '',
  } = props || {};

  const typeManager = useTypeManager();

  const config = typeManager.getTypeBySchema(schema);
  const title = typeManager.getComplexText(schema);
  const icon = config?.getDisplayIcon(schema);
  let properties: IJsonSchema['properties'] =
    drilldown && config ? config.getTypeSchemaProperties(schema) : {};
  const childEntries = Object.entries(properties || {});

  return (
    <TreeItem depth={depth} key={parentKey || 'root'}>
      <TreeRow>
        {depth !== 0 && <HorizontalLine />}
        {showIcon &&
          icon &&
          React.cloneElement(icon, {
            className: 'tree-icon',
          })}
        <TreeTitle>
          {parentKey ? (
            <>
              {`${parentKey} (`}
              {title}
              {')'}
            </>
          ) : (
            title
          )}
        </TreeTitle>
      </TreeRow>
      {childEntries?.length ? (
        <TreeLevel>
          {childEntries.map(([key, value]) => (
            <SchemaTree key={key} {...props} parentKey={key} value={value} depth={depth + 1} />
          ))}
        </TreeLevel>
      ) : null}
    </TreeItem>
  );
}
