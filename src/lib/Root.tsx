import { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createKbdShortcuts } from './createKbdShortcuts';
import { getActiveParentAction } from './actionUtils/actionUtils';
import { rootParentActionId } from './constants';
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
    activeParentActionIdList: [rootParentActionId],
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

      const hasActiveParent = state.activeParentActionIdList.length > 1;

      if (hasActiveParent) {
        storeMethods.setSearchText('');
        storeMethods.resetParentAction();
      }
    },
    togglePalette() {
      setState('visibility', (prev) => (prev === 'opened' ? 'closed' : 'opened'));
    },
    selectParentAction(parentActionId) {
      if (parentActionId === rootParentActionId) {
        return;
      }

      setState('activeParentActionIdList', (old) => {
        return [...old, parentActionId];
      });
      storeMethods.setSearchText('');
    },
    revertParentAction() {
      setState('activeParentActionIdList', (old) => {
        const { isRoot } = getActiveParentAction(old);
        if (isRoot) {
          return old;
        }

        const copiedList = [...old];
        copiedList.pop();

        return copiedList;
      });
    },
    resetParentAction() {
      setState('activeParentActionIdList', [rootParentActionId]);
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
