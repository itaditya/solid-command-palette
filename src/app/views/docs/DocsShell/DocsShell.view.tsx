import { Component, Suspense } from 'solid-js';
import { NavLink, NavLinkProps, Outlet, useIsRouting } from 'solid-app-router';
import { Loader } from '../../../shared/Loader/Loader';
import styles from './DocsShell.module.css';

const SidebarNavLink: Component<NavLinkProps> = (p) => {
  return (
    <NavLink class={styles.navLink} activeClass={styles.activeNavLink} {...p}>
      {p.children}
    </NavLink>
  );
};

const DocsShellView: Component = () => {
  const isRouting = useIsRouting();

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
              <SidebarNavLink href="/docs/api/define-action">defineAction</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/api/root">Root</SidebarNavLink>
            </li>
            <li>
              <SidebarNavLink href="/docs/api/command-palette">CommandPalette</SidebarNavLink>
            </li>
          </ul>
        </nav>
        <Show when={isRouting()}>
          <Loader />
        </Show>
      </aside>
      <main class={styles.main}>
        <Suspense fallback={<Loader size="large" />}>
          <div class={styles.mainContent}>
            <Outlet />
          </div>
        </Suspense>
      </main>
    </section>
  );
};

export default DocsShellView;
