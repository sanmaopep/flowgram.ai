/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormRenderProps } from '@flowgram.ai/free-layout-editor';

import { useIsSidebar } from '../../hooks';
import { FormHeader, FormContent, FormOutputs } from '../../form-components';
import { HTTPNodeJSON } from './types';
import { Timeout } from './components/timeout';
import { Params } from './components/params';
import { Headers } from './components/headers';
import { Body } from './components/body';
import { Api } from './components/api';

export const FormRender = ({ form }: FormRenderProps<HTTPNodeJSON>) => {
  const isSidebar = useIsSidebar();

  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <FormContent>
          <Api />
          <Params />
          <Headers />
          <Body />
          <Timeout />
          <FormOutputs />
        </FormContent>
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent>
        <Api />
        <Params />
        <Headers />
        <Body />
        <Timeout />
        <FormOutputs />
        <FormOutputs />
      </FormContent>
    </>
  );
};
