import { DeepReadonly, Store } from 'solid-js/store';

export type ActionId = string;
export type ParentActionId = null | ActionId;
export type ActionShortcut = string;

export type ActionContext = Record<string, unknown>;

export type DynamicContextMap = Record<ActionId, ActionContext>;

export type ActionsContext = {
  root: ActionContext;
  dynamic: DynamicContextMap;
};

export type RunArgs = {
  actionId: ActionId;
  rootContext: ActionContext;
  dynamicContext: ActionContext;
};

export type Action = {
  id: ActionId;
  parentActionId: ParentActionId;
  title: string;
  subtitle: null | string;
  keywords: Array<string>;
  /**
   * Keyboard Shortcut like `$mod+e`, `Shift+p`.
   */
  shortcut: null | ActionShortcut;
  /**
   * Enable the action conditionally.
   */
  cond?: (args: RunArgs) => boolean;
  run?: (args: RunArgs) => void;
};

export type PartialAction = Partial<Action> & {
  id: ActionId;
  title: Action['title'];
};

export type Actions = Record<ActionId, Action>;
export type ActionsList = Array<Action>;
export type WrappedAction = DeepReadonly<Action>;
export type WrappedActionList = Array<WrappedAction>;

export type RootProps = {
  actions: Actions;
  actionsContext: ActionContext;
};

export type StoreState = {
  visibility: 'opened' | 'closed';
  searchText: string;
  activeParentActionIdList: Array<ActionId>;
  actions: Actions;
  actionsContext: ActionsContext;
};

export type StoreStateWrapped = Store<StoreState>;

export type StoreMethods = {
  setSearchText: (newValue: string) => void;
  setActionsContext: (actionId: ActionId, newData: ActionContext) => void;
  resetActionsContext: (actionId: ActionId) => void;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  selectParentAction: (parentActionId: ActionId) => void;
  revertParentAction: () => void;
  resetParentAction: () => void;
};

export type StoreContext = [StoreStateWrapped, StoreMethods];

type CreateSyncActionsContextCallback = () => ActionContext;

export type CreateSyncActionsContext = (
  actionId: ActionId,
  callback: CreateSyncActionsContextCallback
) => void;
