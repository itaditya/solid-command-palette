import { createEffect, onCleanup } from 'solid-js';
import { useStore } from './StoreContext';

export function createSyncActionsContext(callback) {
  const [_state, { setActionsContext }] = useStore();

  createEffect(() => {
    const data = callback();
    setActionsContext(data);
  });

  onCleanup(() => {
    setActionsContext(undefined);
  });
}
