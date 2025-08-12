/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';

import { Input } from '@douyinfe/semi-ui';

import { useTypeManager } from '@/plugins';

import { PropsType, Strategy as ConstantInputStrategy } from './types';

export { ConstantInputStrategy };

export function ConstantInput(props: PropsType) {
  const { value, onChange, schema, strategies, fallbackRenderer, readonly, ...rest } = props;

  const typeManager = useTypeManager();

  const Renderer = useMemo(() => {
    const strategy = (strategies || []).find((_strategy) => _strategy.hit(schema));

    if (!strategy) {
      return typeManager.getTypeBySchema(schema)?.ConstantRenderer;
    }

    return strategy?.Renderer;
  }, [strategies, schema]);

  if (!Renderer) {
    if (fallbackRenderer) {
      return React.createElement(fallbackRenderer, {
        value,
        onChange,
        readonly,
        ...rest,
      });
    }
    return <Input size="small" disabled placeholder="Unsupported type" />;
  }

  return <Renderer value={value} onChange={onChange} readonly={readonly} {...rest} />;
}
