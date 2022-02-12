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

export function createConditionalActionList() {
  const [state] = useStore();
  const actionsList = createActionList();

  const conditionalActionList = createMemo(() => {
    function actionFilter(action: WrappedAction) {
      const isAllowed = checkActionAllowed(action, state.actionsContext);
      return isAllowed;
    }

    const conditionalActionList = actionsList().filter(actionFilter);
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
