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
    activeParentActionId: null,
    actions: initialActions,
    actionsContext: {
      root: initialActionsContext,
      dynamic: {},
    },
  });

  const storeMethods: StoreMethods = {
    // low level methods
    setSearchText(newValue) {
      setState('searchText', newValue);
    },
    setParentActionId(parentActionId) {
      setState('activeParentActionId', parentActionId);
    },
    setActionsContext(actionId, newData) {
      // @ts-expect-error need to figure out nested store setters.
      setState('actionsContext', 'dynamic', actionId, newData);
    },

    // high level methods
    openPalette() {
      setState('visibility', 'opened');
    },
    closePalette() {
      setState('visibility', 'closed');
      storeMethods.setParentActionId(null);
    },
    togglePalette() {
      setState('visibility', (prev) => (prev === 'opened' ? 'closed' : 'opened'));
    },
    selectParentAction(parentActionId) {
      storeMethods.setParentActionId(parentActionId);
      storeMethods.setSearchText('');
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
