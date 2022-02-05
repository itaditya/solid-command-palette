import { JSX, Component, For, splitProps } from 'solid-js';
import { parseKeybinding } from 'tinykeys';
import { Action } from '../types';
import styles from './KbdShortcut.module.css';

export interface Props extends JSX.HTMLAttributes<HTMLElement> {
  shortcut: Action['shortcut'];
}

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
  const [l, others] = splitProps(p, ['shortcut', 'class']);

  const parsedShortcut = parseKeybinding(l.shortcut);
  const formattedShortcut = getFormattedShortcut(parsedShortcut);

  const keyClasses = [styles.kbdKey, l.class].join(' ');

  return (
    <kbd {...others} class={styles.kbdShortcut}>
      <For each={formattedShortcut}>
        {(group) => (
          <kbd class={styles.kbdGroup}>
            <For each={group}>{(key) => <kbd class={keyClasses}>{key}</kbd>}</For>
          </kbd>
        )}
      </For>
    </kbd>
  );
};
