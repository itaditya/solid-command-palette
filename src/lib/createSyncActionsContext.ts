import { createEffect, onCleanup } from 'solid-js';
import { useStore } from './StoreContext';
import { CreateSyncActionsContext } from './types';

export const createSyncActionsContext: CreateSyncActionsContext = (actionId, callback) => {
  const [_state, { setActionsContext }] = useStore();

  createEffect(() => {
    const data = callback();
    setActionsContext(actionId, data);
  });

  onCleanup(() => {
    setActionsContext(actionId, undefined);
  });
};
