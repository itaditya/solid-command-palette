import { KeyBindingMap } from 'tinykeys';
import { Action, ActionsList, ActionsContext } from './types';

function checkActionAllowed(action: Action, actionsContext: ActionsContext) {
  if (!action.cond) {
    return true;
  }

  const isAllowed = action.cond({ actionId: action.id, actionsContext });
  return isAllowed;
}

export function createShortcutHandlersMap(
  actionsList: ActionsList,
  actionsContext: ActionsContext,
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

        const isAllowed = checkActionAllowed(action, actionsContext);

        if (!isAllowed) {
          return;
        }

        event.preventDefault();
        action.run({ actionId: action.id, actionsContext });
      };

      shortcutMap[action.shortcut] = actionHandler;
    });

  return shortcutMap;
}
