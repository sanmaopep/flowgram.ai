/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import type { FormMeta } from '@flowgram.ai/free-layout-editor';

const OriginFreeFormMetaStoryBuilder = React.lazy(() =>
  import('@flowgram.ai/demo-materials').then((module) => ({
    default: module.FreeFormMetaStoryBuilder,
  }))
);

const FormHeader = React.lazy(() =>
  import('@flowgram.ai/demo-materials').then((module) => ({
    default: module.FormHeader,
  }))
);

const FreeFormMetaStoryBuilder = ({ formMeta }: { formMeta: FormMeta }) => (
  <div style={{ position: 'relative', height: 400 }}>
    <OriginFreeFormMetaStoryBuilder formMeta={formMeta} />
  </div>
);

export { FreeFormMetaStoryBuilder, FormHeader };
