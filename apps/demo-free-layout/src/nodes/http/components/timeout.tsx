/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useNodeRenderContext } from '../../../hooks';

export function Timeout() {
  const { readonly } = useNodeRenderContext();

  return <Timeout />;
}
