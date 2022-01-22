import { Store } from 'solid-js/store';

export type Action = {
  id: string;
  run: () => void;
};

export type PartialAction = Partial<Action>;

export type Actions = Record<Action['id'], Action>;

export type RootProps = {
  actions: Actions;
};

export type StoreState = {
  visibility: 'opened' | 'closed';
  actions: Actions;
};

export type StoreStateWrapped = Store<StoreState>;

export type StoreMethods = {
  open: () => void;
};

export type StoreContext = [StoreStateWrapped, StoreMethods];
