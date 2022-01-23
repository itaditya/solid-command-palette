import { Component } from 'solid-js';
import { Action } from '../types';
import styles from './KbdShortcut.module.css';

export type Props = {
  shortcut: Action['shortcut'];
};

const modifierKey = /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'cmd' : 'control';

export const KbdShortcut: Component<Props> = (p) => {
  const shortcut = p.shortcut.replaceAll('$mod', modifierKey);
  return <kbd class={styles.kbdShortcut}>{shortcut}</kbd>;
};
