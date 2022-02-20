import { Component, Suspense } from 'solid-js';
import { NavLink, Outlet } from 'solid-app-router';
import utilStyles from '../../../utils.module.css';
import styles from './DocsShell.module.css';

const Loader: Component = () => {
  return <h2 class={`${styles.loader} ${utilStyles.nonFlickerLoader} ${utilStyles.stripSpace}`}>Loading...</h2>;
};

const DocsShellView: Component = () => {
  return (
    <section class={styles.wrapper}>
      <aside class={styles.sidebar}>
        <nav>
          <h2>Introduction</h2>
          <ul>
            <li>
              <NavLink href="/docs/overview">Overview</NavLink>
            </li>
            <li>
              <NavLink href="/docs/installation">Installation</NavLink>
            </li>
          </ul>
        </nav>
        <nav>
          <h2>API</h2>
          <ul>
            <li>
              <NavLink href="/docs/api#root">Root</NavLink>
            </li>
            <li>
              <NavLink href="/docs/api#define-action">defineAction</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main class={styles.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </section>
  );
};

export default DocsShellView;
