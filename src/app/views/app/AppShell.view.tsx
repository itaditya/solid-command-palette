import { Component, Show } from 'solid-js';
import { Link, NavLink, NavLinkProps, Outlet, useMatch } from 'solid-app-router';
import { SocialIcon, socialsData } from './SocialIcons';
import utilStyles from '../../utils.module.css';
import styles from './AppShell.module.css';

const HeaderNavLink: Component<NavLinkProps> = (p) => {
  return <NavLink class={styles.navLink} activeClass={styles.activeNavLink} {...p} />;
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
          <h3 class={styles.heading}>
            <Link class={styles.headingLink} href="/">
              Solid Command Palette
            </Link>
          </h3>
        </div>
        <nav class={styles.navWrapper}>
          <ul class={`${styles.navList} ${utilStyles.stripSpace}`}>
            <li>
              <HeaderNavLink href="/demo">Kitchen Sink Demo</HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink href="/docs">Documentation</HeaderNavLink>
            </li>
          </ul>
        </nav>
        <div>
          <ul class={`${styles.socialList} ${utilStyles.stripSpace}`}>
            <li class={styles.socialItem}>
              <SocialIcon {...socialsData.twitter} class={styles.socialLink} />
            </li>
            <li class={styles.socialItem}>
              <SocialIcon {...socialsData.github} class={styles.socialLink} />
            </li>
          </ul>
        </div>
      </header>
      <main class={styles.main}>
        <MaintenanceContent />
        <Outlet />
      </main>
      <footer class={styles.footer}>
        <span>Made by</span>
        <a
          class={styles.creditLink}
          href="https://devadi.netlify.app"
          rel="noopener"
          target="_blank"
        >
          Aditya Agarwal
        </a>
      </footer>
    </section>
  );
};

export default AppShellView;
