import { JSX, Component, For, splitProps } from 'solid-js';
import { getFormattedShortcut } from './utils';
import { ActionShortcut } from '../types';
import styles from './KbdShortcut.module.css';

export interface KbdShortcutProps extends JSX.HTMLAttributes<HTMLElement> {
  shortcut: ActionShortcut;
}

export const KbdShortcut: Component<KbdShortcutProps> = (p) => {
  const [l, others] = splitProps(p, ['shortcut', 'class']);

  const formattedShortcut = getFormattedShortcut(l.shortcut);

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
