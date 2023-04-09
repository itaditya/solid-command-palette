import { Component } from 'solid-js';
import { KbdShortcut, useControls } from '../../../lib';
import { ExampleSlider } from './exampleSlider/ExampleSlider';
import utilStyles from '../../utils.module.css';
import styles from './Home.module.css';

const HomeView: Component = () => {
  const { openPalette } = useControls();

  return (
    <section class={styles.wrapper}>
      <main class={styles.main}>
        <h3 class={`${styles.title} ${utilStyles.stripSpace}`}>
          <span>
            Make your tool lightning fast
          </span>
          <span class={styles.titleSecondary}>
            <span>with </span>
            <button
              class={utilStyles.demoAction}
              data-size="large"
              onClick={openPalette}
            >
              cmd palette{' '}
              <KbdShortcut
                shortcut="$mod+k"
                class={styles.demoShortcut}
              />
            </button>
          </span>
        </h3>
      </main>
      <aside class={styles.aside}>
        <ExampleSlider />
      </aside>
    </section>
  );
};

export default HomeView;
