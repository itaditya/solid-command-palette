import { KeyBindingMap } from 'tinykeys';
import { ActionContext, ActionsContext, WrappedAction, WrappedActionList } from './types';

function checkActionAllowed(
  action: WrappedAction,
  rootContext: ActionContext,
  dynamicContext: ActionContext
) {
  if (!action.cond) {
    return true;
  }

  const isAllowed = action.cond({ actionId: action.id, rootContext, dynamicContext });
  return isAllowed;
}

export function createShortcutHandlersMap(
  actionsList: WrappedActionList,
  actionsContext: ActionsContext
) {
  const shortcutMap: KeyBindingMap = {};

  actionsList
    .filter((action) => Boolean(action.shortcut))
    .forEach((action) => {
      const actionHandler = (event: KeyboardEvent) => {
        const targetElem = event.target as HTMLElement;
        const shortcutsAttr = targetElem.dataset.cpKbdShortcuts;

        if (shortcutsAttr === 'disabled') {
          return;
        }

        const rootContext = actionsContext.root;
        const dynamicContext = actionsContext.dynamic[action.id] || {};

        const isAllowed = checkActionAllowed(action, rootContext, dynamicContext);

        if (!isAllowed) {
          return;
        }

        event.preventDefault();
        action.run({ actionId: action.id, rootContext, dynamicContext });
      };

      shortcutMap[action.shortcut] = actionHandler;
    });

  return shortcutMap;
}
