import { createStore } from 'solid-js/store';
import { StoreState, StoreMethods, StoreContext } from './types';
import { Provider, useStore } from './StoreContext';

function RootInternal() {
  const [state, { open }] = useStore();

  return (
    <div>
      RootInternal is {state.visibility}
      <button onClick={() => open()}>Click me</button>
    </div>
  );
}

export function Root(p) {
  const initialActions = p.actions || [];
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
}
