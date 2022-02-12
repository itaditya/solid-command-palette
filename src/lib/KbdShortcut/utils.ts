import { parseKeybinding } from 'tinykeys';
import { GetFormattedShortcut } from './types';

function getFormattedKey(key: string) {
  if (key === 'Meta') {
    return '⌘';
  }

  if (key === 'Control') {
    return 'Ctrl';
  }

  if (key === 'Escape') {
    return 'Esc';
  }

  return key;
}

export const getFormattedShortcut: GetFormattedShortcut = (shortcut) => {
  const parsedShortcut = parseKeybinding(shortcut);

  const formattedShortcut = parsedShortcut.map((group) => {
    const flatGroup = group.flat();
    const formattedGroup = flatGroup.map(getFormattedKey);
    return formattedGroup;
  });

  return formattedShortcut;
};
