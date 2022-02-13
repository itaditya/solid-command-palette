import { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createKbdShortcuts } from './createKbdShortcuts';
import { Provider } from './StoreContext';
import { RootProps, StoreState, StoreMethods, StoreContext } from './types';

const RootInternal: Component = () => {
  createKbdShortcuts();

  return null;
};

export const Root: Component<RootProps> = (p) => {
  const initialActions = p.actions || {};
  const initialActionsContext = p.actionsContext || {};

  const [state, setState] = createStore<StoreState>({
    visibility: 'closed',
    searchText: '',
    actions: initialActions,
    actionsContext: {
      root: initialActionsContext,
      dynamic: {},
    },
  });

  const storeMethods: StoreMethods = {
    openPalette() {
      setState('visibility', 'opened');
    },
    closePalette() {
      setState('visibility', 'closed');
    },
    togglePalette() {
      setState('visibility', (prev) => (prev === 'opened' ? 'closed' : 'opened'));
    },
    setSearchText(newValue) {
      setState('searchText', newValue);
    },
    setActionsContext(actionId, newData) {
      // @ts-expect-error need to figure out nested store setters.
      setState('actionsContext', 'dynamic', actionId, newData);
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
