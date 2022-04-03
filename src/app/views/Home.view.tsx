import { Component } from 'solid-js';
import { KbdShortcut, useControls } from '../../lib';
import utilStyles from '../utils.module.css';
import styles from './Home.module.css';

const HomeView: Component = () => {
  const { openPalette } = useControls();

  return (
    <section class={styles.wrapper}>
      <main class={styles.main}>
        <h3 class={`${styles.title} ${utilStyles.stripSpace}`}>
          <span>Make your tool lighting fast</span>
          <span class={styles.titleSecondary}>
            <span>with </span>
            <button
              class={utilStyles.demoAction}
              data-size="large"
              onClick={openPalette}
            >
              command palette{' '}
              <KbdShortcut
                shortcut="$mod+k"
                class={styles.demoShortcut}
              />
            </button>
          </span>
        </h3>
      </main>
      <aside>Hello</aside>
    </section>
  );
};

export default HomeView;
