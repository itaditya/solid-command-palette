import { Store } from 'solid-js/store';

export type ActionContext = Record<string, unknown>;

type DynamicContextMap = Record<string, ActionContext>;

export type ActionsContext = {
  root: ActionContext;
  dynamic: DynamicContextMap;
};

export type RunArgs = {
  actionId: Action['id'];
  rootContext: ActionContext;
  dynamicContext: ActionContext;
};

export type Action = {
  id: string;
  title: string;
  subtitle?: string;
  keywords: Array<string>;
  /**
   * Keyboard Shortcut like `$mod+e`, `Shift+p`.
   */
  shortcut: string | null;
  /**
   * Enable the action conditionally.
   */
  cond?: (args: RunArgs) => boolean;
  run: (args: RunArgs) => void;
};

export type PartialAction = Partial<Action> & {
  id: Action['id'];
  title: Action['title'];
};

export type Actions = Record<Action['id'], Action>;
export type ActionsList = Array<Action>;

export type RootProps = {
  actions: Actions;
  actionsContext: ActionContext;
};

export type StoreState = {
  visibility: 'opened' | 'closed';
  searchText: string;
  actions: Actions;
  actionsContext: ActionsContext;
};

export type StoreStateWrapped = Store<StoreState>;

export type StoreMethods = {
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  setSearchText: (newValue: string) => void;
  setActionsContext: (actionId: Action['id'], newData: ActionContext) => void;
};

export type StoreContext = [StoreStateWrapped, StoreMethods];
