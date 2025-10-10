/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Meta, StoryObj } from 'storybook-react-rsbuild';

import { FreeMaterialStoryBuilder } from '../../components/free-material-story-builder';
import { FormHeader } from '../../components/form-header';

const Story = () => (
  <FreeMaterialStoryBuilder
    formMeta={{
      render: () => (
        <div>
          <FormHeader />
          <div>TODO</div>
        </div>
      ),
    }}
  />
);

const meta: Meta<typeof FreeMaterialStoryBuilder> = {
  title: 'Form Components/VariableSelector',
  component: Story,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export default meta;
