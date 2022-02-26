import { Component, Suspense } from 'solid-js';
import { NavLink, NavLinkProps, Outlet } from 'solid-app-router';
import utilStyles from '../../../utils.module.css';
import styles from './DocsShell.module.css';

const SidebarNavLink: Component<NavLinkProps> = (p) => {
  return (
    <NavLink class={styles.navLink} activeClass={styles.activeNavLink} {...p}>
      {p.children}
    </NavLink>
  );
};

const Loader: Component = () => {
  return (
    <h2 class={`${styles.loader} ${utilStyles.nonFlickerLoader} ${utilStyles.stripSpace}`}>
      Loading...
    </h2>
  );
};

const DocsShellView: Component = () => {
  return (
    <section class={styles.wrapper}>
      <aside class={styles.sidebar}>
        <nav class={styles.sidebarNavGroup}>
          <h3>Introduction</h3>
          <ul class={styles.sidebarNavList}>
            <li>
              <SidebarNavLink href="/docs/overview">Overview</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/installation">Installation</SidebarNavLink>
            </li>
          </ul>
        </nav>
        <nav class={styles.sidebarNavGroup}>
          <h3>API</h3>
          <ul class={styles.sidebarNavList}>
            <li>
              <SidebarNavLink href="/docs/api/root">Root</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/api/define-action">defineAction</SidebarNavLink>
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
