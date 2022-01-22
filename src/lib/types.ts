import { Store } from "solid-js/store";

export type Action = {
  id: string;
  run: () => void;
};

export type StoreState = {
  visibility: 'opened' | 'closed';
  actions: Array<Action>;
};

export type StoreStateWrapped = Store<StoreState>;

export type StoreMethods = {
  open: () => void;
};

export type StoreContext = [StoreStateWrapped, StoreMethods];
