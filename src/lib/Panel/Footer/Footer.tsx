import { Component } from 'solid-js';
import styles from './Footer.module.css';

export interface IconArrowProps {
  direction?: 'up' | 'down';
}

const IconArrow: Component<IconArrowProps> = (p) => {
  return (
    <svg
      class={`${styles.icon} ${styles.iconArrow}`}
      data-arrow-direction={p.direction || 'up'}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M8 7l4-4m0 0l4 4m-4-4v18"
      />
    </svg>
  );
};

const IconReturn: Component = () => {
  return (
    <svg
      class={`${styles.icon} ${styles.iconReturn}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={1}
        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
      />
    </svg>
  );
};

export const PanelFooter: Component = () => {
  return (
    <div class={styles.footer}>
      <div class={styles.group}>
        Navigate with{' '}
        <kbd class={styles.shortcut}>
          <IconArrow />
        </kbd>
        <kbd class={styles.shortcut}>
          <IconArrow direction="down" />
        </kbd>
      </div>
      <div class={styles.group}>
        Select using{' '}
        <kbd class={`${styles.shortcut} ${styles.runShortcut}`}>
          <IconReturn />
        </kbd>
      </div>
    </div>
  );
};
