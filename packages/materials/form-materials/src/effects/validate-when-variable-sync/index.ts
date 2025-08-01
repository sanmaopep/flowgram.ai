import { isEmpty } from 'lodash';
import {
  DataEvent,
  Effect,
  EffectOptions,
  getNodeScope,
  getNodePrivateScope,
} from '@flowgram.ai/editor';

export const validateWhenVariableSync = ({
  scope,
}: {
  scope?: 'private' | 'public';
} = {}): EffectOptions[] => [
  {
    event: DataEvent.onValueInit,
    effect: (({ context, form }) => {
      const nodeScope =
        scope === 'private' ? getNodePrivateScope(context.node) : getNodeScope(context.node);

      const disposable = nodeScope.available.onListOrAnyVarChange(() => {
        if (!isEmpty(form.state.errors)) {
          form.validate();
        }
      });

      return () => disposable.dispose();
    }) as Effect,
  },
];
