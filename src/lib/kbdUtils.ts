import { KeyBindingMap } from 'tinykeys';
import { ActionsList, ActionsContext } from './types';

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

        event.preventDefault();
        action.run({ actionId: action.id, actionsContext });
      };

      shortcutMap[action.shortcut] = actionHandler;
    });

  return shortcutMap;
}
