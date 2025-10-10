/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import type { FormMeta } from '@flowgram.ai/free-layout-editor';

import { PreviewEditor } from 'components/preview-editor';

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
  <PreviewEditor files={{}} previewStyle={{ height: 500 }} editorStyle={{ height: 0 }}>
    <OriginFreeFormMetaStoryBuilder formMeta={formMeta} />
  </PreviewEditor>
);

export { FreeFormMetaStoryBuilder, FormHeader };
