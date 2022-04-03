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
        <div>
          <figure class={`${styles.exampleWrapper} ${utilStyles.stripSpace}`}>
            <img
              class={styles.exampleImage}
              src="/images/command-palette-examples/linear.png"
              alt="Command Palette in Linear"
            />
            <figcaption>
              Tasks can be quickly assigned in{' '}
              <a
                class={styles.exampleLink}
                href="https://linear.app/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Linear
              </a>
            </figcaption>
          </figure>
        </div>
      </aside>
    </section>
  );
};

export default HomeView;
