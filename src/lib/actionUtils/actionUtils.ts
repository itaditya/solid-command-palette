import { KeyBindingMap } from 'tinykeys';
import { rootParentActionId } from '../constants';
import { ActionId, ActionsContext, InvokeBy, StoreMethods, WrappedAction, WrappedActionList } from '../types';

type RunStoreMethods = {
  selectParentAction: StoreMethods['selectParentAction'];
  closePalette: StoreMethods['closePalette'];
  openPalette: StoreMethods['openPalette'];
};

function getActionContext(action: WrappedAction, actionsContext: ActionsContext) {
  const rootContext = actionsContext.root;
  const dynamicContext = actionsContext.dynamic[action.id] || {};

  return {
    rootContext,
    dynamicContext,
  };
}

export function checkActionAllowed(action: WrappedAction, actionsContext: ActionsContext) {
  if (!action.cond) {
    return true;
  }

  const { rootContext, dynamicContext } = getActionContext(action, actionsContext);

  const isAllowed = action.cond({ actionId: action.id, rootContext, dynamicContext });
  return isAllowed;
}

export function runAction(
  action: WrappedAction,
  actionsContext: ActionsContext,
  storeMethods: RunStoreMethods,
  invokedBy: InvokeBy
) {
  const { id, run } = action;

  if (!run) {
    storeMethods.selectParentAction(id);
    if (invokedBy === 'shortcut') {
      storeMethods.openPalette();
    }
    return;
  }

  const { rootContext, dynamicContext } = getActionContext(action, actionsContext);
  run({ actionId: id, rootContext, dynamicContext });
  storeMethods.closePalette();
}

export function getShortcutHandlersMap(
  actionsList: WrappedActionList,
  actionsContext: ActionsContext,
  storeMethods: StoreMethods
) {
  const shortcutMap: KeyBindingMap = {};

  actionsList.forEach((action) => {
    const actionHandler = (event: KeyboardEvent) => {
      const targetElem = event.target as HTMLElement;
      const shortcutsAttr = targetElem.dataset.cpKbdShortcuts;

      if (shortcutsAttr === 'disabled') {
        return;
      }

      const isAllowed = checkActionAllowed(action, actionsContext);

      if (!isAllowed) {
        return;
      }

      event.preventDefault();
      runAction(action, actionsContext, storeMethods, 'shortcut');
    };

    const shortcut = action.shortcut;
    if (shortcut) {
      shortcutMap[shortcut] = actionHandler;
    }
  });

  return shortcutMap;
}

type ActiveParentActionIdListArg = Readonly<Array<ActionId>>;

export function getActiveParentAction(activeParentActionIdList: ActiveParentActionIdListArg) {
  const activeId = activeParentActionIdList.at(-1) || rootParentActionId;
  const isRoot = activeId === rootParentActionId;

  return {
    activeId,
    isRoot,
  };
}
