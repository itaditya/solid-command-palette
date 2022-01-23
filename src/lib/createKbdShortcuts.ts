import { onMount, onCleanup } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { createActionList } from './createActionList';
import { createShortcutHandlersMap } from './kbdUtils';

export function createKbdShortcuts() {
  const [state, { togglePalette }] = useStore();
  const actionsList = createActionList();

  let unsubscribe = null;

  onMount(() => {
    const shortcutMap = createShortcutHandlersMap(actionsList(), state.actionsContext);

    const commandPaletteHandler = (event: KeyboardEvent) => {
      event.preventDefault();
      console.log('ran from kbd');
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
