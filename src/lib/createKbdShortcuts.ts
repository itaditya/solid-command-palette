import { onMount, onCleanup } from 'solid-js';
import { tinykeys } from 'tinykeys';
import { useStore } from './StoreContext';
import { createActionList } from './createActionList';
import { getShortcutHandlersMap } from './actionUtils/actionUtils';

type Unsubscribe = null | ReturnType<typeof tinykeys>;

export function createKbdShortcuts() {
  const [state, storeMethods] = useStore();
  const { togglePalette } = storeMethods;
  const actionsList = createActionList();

  let unsubscribe: Unsubscribe = null;

  onMount(() => {
    const shortcutMap = getShortcutHandlersMap(actionsList(), state.actionsContext, storeMethods);

    const commandPaletteHandler = (event: KeyboardEvent) => {
      event.preventDefault();
      togglePalette();
    };

    unsubscribe = tinykeys(window, {
      ...shortcutMap,
      '$mod+k': commandPaletteHandler,
    });
  });

  onCleanup(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
}
