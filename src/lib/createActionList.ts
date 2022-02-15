import { createMemo, createEffect } from 'solid-js';
import Fuse from 'fuse.js';
import { useStore } from './StoreContext';
import { checkActionAllowed } from './actionUtils/actionUtils';
import { WrappedAction } from './types';

export function createActionList() {
  const [state] = useStore();

  const actionsList = createMemo(() => {
    return Object.values(state.actions);
  });

  return actionsList;
}

export function createNestedActionList() {
  const actionsList = createActionList();
  const [state] = useStore();

  function nestedActionFilter(action: WrappedAction) {
    if (state.activeParentActionId === null) {
      return true;
    }

    const isAllowed = action.parentActionId === state.activeParentActionId;
    return isAllowed;
  }

  const nestedActionsList = createMemo(() => {
    const nestedActionsList = actionsList().filter(nestedActionFilter);
    return nestedActionsList;
  });

  return nestedActionsList;
}

export function createConditionalActionList() {
  const [state] = useStore();
  const nestedActionsList = createNestedActionList();

  function conditionalActionFilter(action: WrappedAction) {
    const isAllowed = checkActionAllowed(action, state.actionsContext);
    return isAllowed;
  }

  const conditionalActionList = createMemo(() => {
    const conditionalActionList = nestedActionsList().filter(conditionalActionFilter);
    return conditionalActionList;
  });

  return conditionalActionList;
}

export function createSearchResultList() {
  const [state] = useStore();
  const conditionalActionList = createConditionalActionList();

  const fuse = new Fuse(conditionalActionList(), {
    keys: [
      {
        name: 'title',
        weight: 1,
      },
      {
        name: 'subtitle',
        weight: 0.7,
      },
      {
        name: 'keywords',
        weight: 0.5,
      },
    ],
  });

  const resultsList = createMemo(() => {
    if (state.searchText.length === 0) {
      return conditionalActionList();
    }

    const searchResults = fuse.search(state.searchText);

    const resultsList = searchResults.map((result) => result.item);
    return resultsList;
  });

  createEffect(() => {
    fuse.setCollection(conditionalActionList());
  });

  return resultsList;
}
