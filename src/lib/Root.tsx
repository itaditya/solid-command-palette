import { Component, For, onCleanup, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tinykeys from 'tinykeys';
import { RootProps, StoreState, StoreMethods, StoreContext } from './types';
import { Provider, useStore } from './StoreContext';
import { createShortcutHandlersMap } from './kbdUtils';

const RootInternal: Component = () => {
  const [state, { open, toggle }] = useStore();

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

  return (
    <div>
      RootInternal is {state.visibility}
      <button onClick={() => open()}>Open Command Palette</button>
      <Show when={state.visibility === 'opened'}>
        <ul>
          <For each={Object.values(state.actions)} fallback={<div>No Actions</div>}>
            {(action) => {
              return (
                <li>
                  <button
                    onClick={() => {
                      action.run({ actionsContext: state.actionsContext });
                    }}
                  >
                    Run Action {action.id}
                  </button>
                </li>
              );
            }}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export const Root: Component<RootProps> = (p) => {
  const initialActions = p.actions || {};
  const initialActionsContext = p.actionsContext || {};

  const [state, setState] = createStore<StoreState>({
    visibility: 'closed',
    actions: initialActions,
    actionsContext: initialActionsContext,
  });

  const storeMethods: StoreMethods = {
    open() {
      setState('visibility', 'opened');
    },
    close() {
      setState('visibility', 'closed');
    },
    toggle() {
      setState('visibility', (prev) => (prev === 'opened' ? 'closed' : 'opened'));
    },
  };

  const store: StoreContext = [state, storeMethods];

  return (
    <Provider value={store}>
      <div>
        <RootInternal />
        {p.children}
      </div>
    </Provider>
  );
};
