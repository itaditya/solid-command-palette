import { Component } from 'solid-js';
import { DeepReadonly, Store } from 'solid-js/store';

export type ActionId = string;
export type ParentActionId = null | ActionId;
export type ActionShortcut = string;

export type ActionContext = Record<string, unknown>;

export type DynamicContextMap = Record<ActionId, ActionContext>;

export interface ActionsContext {
  root: ActionContext;
  dynamic: DynamicContextMap;
}

export interface RunArgs {
  actionId: ActionId;
  rootContext: ActionContext;
  dynamicContext: ActionContext;
}

export interface BaseAction {
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
  /**
   * Prevent children from being displayed at the root level of the palette.
   *
   * Default: `true`
   */
  isolateChildren?: boolean;
}

export interface ChildAction {
  isolateChildren?: never;
}

export interface ParentAction {
  parentActionId: never;
  run?: never;
}

export type Action =
  | (Omit<BaseAction, keyof ChildAction> & ChildAction)
  | (Omit<BaseAction, keyof ParentAction> & ParentAction)

export type PartialAction = Partial<Action> & {
  id: ActionId;
  title: Action['title'];
};

export type Actions = Record<ActionId, Action>;
export type ActionsList = Array<Action>;
export type WrappedAction = DeepReadonly<Action>;
export type WrappedActionList = Array<WrappedAction>;

export interface ResultContentProps {
  action: WrappedAction;
  isActive: boolean;
}

export interface Components {
  ResultContent: Component<ResultContentProps>;
}

export interface RootProps {
  actions: Actions;
  actionsContext: ActionContext;
  components?: Components;
}

export interface StoreState {
  visibility: 'opened' | 'closed';
  searchText: string;
  activeParentActionIdList: Array<ActionId>;
  actions: Actions;
  actionsContext: ActionsContext;
  components?: Components;
}

export type StoreStateWrapped = Store<StoreState>;

export interface StoreMethods {
  setSearchText: (newValue: string) => void;
  setActionsContext: (actionId: ActionId, newData: ActionContext) => void;
  resetActionsContext: (actionId: ActionId) => void;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  selectParentAction: (parentActionId: ActionId) => void;
  revertParentAction: () => void;
  resetParentAction: () => void;
}

export type StoreContext = [StoreStateWrapped, StoreMethods];

type CreateSyncActionsContextCallback = () => ActionContext;

export type CreateSyncActionsContext = (
  actionId: ActionId,
  callback: CreateSyncActionsContextCallback
) => void;
