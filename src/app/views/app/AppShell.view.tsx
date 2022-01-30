import { Component, Show } from 'solid-js';
import { Link, NavLink, NavLinkProps, Outlet, useMatch } from 'solid-app-router';
import styles from './AppShell.module.css';

const HeaderNavLink: Component<NavLinkProps> = (p) => {
  return <NavLink class={styles.navLink} activeClass={styles.activeNavLink} end={true} {...p} />;
};

const MaintenanceContent: Component = () => {
  const isDemo = useMatch(() => '/demo');
  return (
    <Show when={!isDemo()}>
      <div>
        <h2>This page is under construction. Meanwhile check out the demo.</h2>
        <Link class={styles.demoAction} href="/demo">
          Try Demo
        </Link>
      </div>
    </Show>
  );
};

const AppShellView: Component = () => {
  return (
    <section class={styles.wrapper}>
      <header class={styles.header}>
        <div>
          <h3 class={styles.heading}>Solid Command Palette</h3>
        </div>
        <nav>
          <ul class={styles.navList}>
            <li class={styles.navItem}>
              <HeaderNavLink href="/">Home</HeaderNavLink>
            </li>
            <li class={styles.navItem}>
              <HeaderNavLink href="/demo">Demo</HeaderNavLink>
            </li>
            <li class={styles.navItem}>
              <HeaderNavLink href="/docs/overview">Overview</HeaderNavLink>
            </li>
            <li class={styles.navItem}>
              <HeaderNavLink href="/docs/installation">Installation</HeaderNavLink>
            </li>
            <li class={styles.navItem}>
              <HeaderNavLink href="/docs/api">API</HeaderNavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main class={styles.main}>
        <MaintenanceContent />
        <Outlet />
      </main>
      <footer class={styles.footer}>
        <span>Made by</span>
        <a class={styles.creditLink} href="https://github.com/itaditya/solid-command-palette">
          Aditya Agarwal
        </a>
      </footer>
    </section>
  );
};

export default AppShellView;
