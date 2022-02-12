import { onMount, onCleanup } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { createActionList } from './createActionList';
import { getShortcutHandlersMap } from './actionUtils/actionUtils';

export function createKbdShortcuts() {
  const [state, { togglePalette }] = useStore();
  const actionsList = createActionList();

  let unsubscribe = null;

  onMount(() => {
    const shortcutMap = getShortcutHandlersMap(actionsList(), state.actionsContext);

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
