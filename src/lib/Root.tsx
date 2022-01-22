import { Component, onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import tinykeys from 'tinykeys';
import { RootProps, StoreState, StoreMethods, StoreContext } from './types';
import { Provider, useStore } from './StoreContext';

const RootInternal: Component = () => {
  const [state, { open }] = useStore();

  let unsubscribe = null;

  onMount(() => {
    unsubscribe = tinykeys(window, {
      '$mod+k': () => {
        console.log('ran from kbd');
        open();
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
      <button onClick={() => state.actions.first.run()}>Run Action</button>
      <button onClick={() => open()}>Open Command Palette</button>
    </div>
  );
};

export const Root: Component<RootProps> = (p) => {
  const initialActions = p.actions || {};
  const [state, setState] = createStore<StoreState>({
    visibility: 'closed',
    actions: initialActions,
  });

  const storeMethods: StoreMethods = {
    open() {
      setState('visibility', 'opened');
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
