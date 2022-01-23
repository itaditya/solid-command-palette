import { onMount, onCleanup } from 'solid-js';
import tinykeys from 'tinykeys';
import { useStore } from './StoreContext';
import { createShortcutHandlersMap } from './kbdUtils';

export function createKbdShortcuts() {
  const [state, { toggle }] = useStore();

  let unsubscribe = null;

  onMount(() => {
    const shortcutMap = createShortcutHandlersMap(state.actions, state.actionsContext);

    const commandPaletteHandler = (event: KeyboardEvent) => {
      event.preventDefault();
      console.log('ran from kbd');
      toggle();
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
