import { KeyBindingMap } from 'tinykeys';
import { Actions, ActionsContext } from './types';

export function createShortcutHandlersMap(actions: Actions, actionsContext: ActionsContext) {
  const shortcutMap: KeyBindingMap = {};

  Object.values(actions)
    .filter((action) => Boolean(action.shortcut))
    .forEach((action) => {
      const actionHandler = (event: KeyboardEvent) => {
        event.preventDefault();
        action.run({ actionId: action.id, actionsContext });
      };

      shortcutMap[action.shortcut] = actionHandler;
    });

  return shortcutMap;
}
