import { createMemo } from 'solid-js';
import { useStore } from './StoreContext';

export function createActionList() {
  const [state] = useStore();

  const actionsList = createMemo(() => {
    return Object.values(state.actions);
  });

  return actionsList;
}
