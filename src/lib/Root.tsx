import { Component, For, onCleanup, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tinykeys from 'tinykeys';
import { RootProps, StoreState, StoreMethods, StoreContext } from './types';
import { Provider, useStore } from './StoreContext';

const RootInternal: Component = () => {
  const [state, { open, toggle }] = useStore();

  let unsubscribe = null;

  onMount(() => {
    unsubscribe = tinykeys(window, {
      '$mod+k': () => {
        console.log('ran from kbd');
        toggle();
      },
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
          <For each={Object.entries(state.actions)} fallback={<div>No Actions</div>}>
            {([actionId, action]) => {
              return (
                <li>
                  <button
                    onClick={() => {
                      action.run({ actionsContext: state.actionsContext });
                    }}
                  >
                    Run Action {actionId}
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
      setState('visibility', (prev) => prev === 'opened' ? 'closed' : 'opened');
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
