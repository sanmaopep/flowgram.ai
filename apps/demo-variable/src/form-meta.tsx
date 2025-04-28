import { FormMeta, ValidateTrigger } from '@flowgram.ai/free-layout-editor';

// FieldWrapper is not provided by sdk, and can be customized

const render = () => <div className="demo-node-content">Nothing</div>;

const formMeta: FormMeta = {
  render,
  defaultValues: { name: 'Tina', city: 'Hangzhou' },
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    name: ({ value }) => {
      if (!value) {
        return 'Name is required';
      }
    },
    city: ({ value }) => {
      if (!value) {
        return 'City is required';
      }
    },
  },
};

export const DEFAULT_FORM_META = formMeta;
