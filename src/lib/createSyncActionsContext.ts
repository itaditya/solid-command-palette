import { createEffect, onCleanup } from 'solid-js';
import { useStore } from './StoreContext';

export function createSyncActionsContext(actionId: string, callback) {
  const [_state, { setActionsContext }] = useStore();

  createEffect(() => {
    const data = callback();
    setActionsContext(actionId, data);
  });

  onCleanup(() => {
    setActionsContext(actionId, undefined);
  });
}
