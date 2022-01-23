import { createEffect, createMemo } from 'solid-js';
import Fuse from 'fuse.js';

import { useStore } from './StoreContext';

export function createActionList() {
  const [state] = useStore();

  const actionsList = createMemo(() => {
    return Object.values(state.actions);
  });

  return actionsList;
}

export function createSearchResultList() {
  const [state] = useStore();
  const actionsList = createActionList();

  const fuse = new Fuse([], {
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

  createEffect(() => {
    fuse.setCollection(actionsList());
  });

  const resultsList = createMemo(() => {
    if (state.searchText.length === 0) {
      return actionsList();
    }

    const searchResults = fuse.search(state.searchText);

    const resultsList = searchResults.map((result) => result.item);
    return resultsList;
  });

  return resultsList;
}
