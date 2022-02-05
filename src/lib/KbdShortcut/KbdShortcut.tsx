import { Component, For } from 'solid-js';
import { parseKeybinding } from 'tinykeys';
import { Action } from '../types';
import styles from './KbdShortcut.module.css';

export type Props = {
  size?: 'normal' | 'large';
  shortcut: Action['shortcut'];
};

type KeyBindingPress = ReturnType<typeof parseKeybinding>;

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

function getFormattedShortcut(parsedShortcut: KeyBindingPress) {
  const formattedShortcut = parsedShortcut.map((group) => {
    const flatGroup = group.flat();
    const formattedGroup = flatGroup.map(getFormattedKey);
    return formattedGroup;
  });

  return formattedShortcut;
}

export const KbdShortcut: Component<Props> = (p) => {
  const size = p.size || 'normal';
  const parsedShortcut = parseKeybinding(p.shortcut);
  const formattedShortcut = getFormattedShortcut(parsedShortcut);

  return (
    <kbd class={styles.kbdShortcut}>
      <For each={formattedShortcut}>
        {(group) => (
          <kbd class={styles.kbdGroup}>
            <For each={group}>
              {(key) => (
                <kbd class={styles.kbdKey} data-size={size}>
                  {key}
                </kbd>
              )}
            </For>
          </kbd>
        )}
      </For>
    </kbd>
  );
};
