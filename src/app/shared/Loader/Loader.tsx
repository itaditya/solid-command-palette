import { Component } from 'solid-js';
import utilStyles from '../../utils.module.css';
import styles from './Loader.module.css';

export interface LoaderProps {
  size?: 'normal' | 'large';
}

export const Loader: Component<LoaderProps> = (p) => {
  return (
    <span class={`${styles.wrapper} ${utilStyles.nonFlickerLoader}`} aria-live="polite">
      <svg
        class={styles.loader}
        data-size={p.size || 'normal'}
        width="1em"
        height="1em"
        viewBox="0 0 141 141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M59.1934 101.465L44.8206 140.954L101.465 81.7534L140.954 96.1262L81.7508 39.4891L96.1236 0L39.4891 59.1961L0 44.8232L59.1934 101.465ZM70.5921 80.5934C76.1149 80.5934 80.5921 76.1163 80.5921 70.5934C80.5921 65.0706 76.1149 60.5934 70.5921 60.5934C65.0692 60.5934 60.5921 65.0706 60.5921 70.5934C60.5921 76.1163 65.0692 80.5934 70.5921 80.5934Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};
