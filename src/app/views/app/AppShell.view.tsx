import { Component, Show } from 'solid-js';
import { Link, NavLink, NavLinkProps, Outlet, useMatch, useNavigate } from 'solid-app-router';
import { Root, CommandPalette } from '../../../lib';
import { SocialIcon, socialsData } from './SocialIcons';
import { actions } from './actions';
import utilStyles from '../../utils.module.css';
import styles from './AppShell.module.css';

const HeaderNavLink: Component<NavLinkProps> = (p) => {
  return (
    <NavLink
      class={styles.navLink}
      activeClass={styles.activeNavLink}
      {...p}
    >
      <span class={styles.navLinkContent}>{p.children}</span>
    </NavLink>
  );
};

const Main: Component = () => {
  const isDemo = useMatch(() => '/demo');
  const navigate = useNavigate();

  const actionsContext = {
    navigate,
  };

  return (
    <main class={styles.main}>
      <Show
        when={!isDemo()}
        fallback={<Outlet />}
      >
        <Root
          actions={actions}
          actionsContext={actionsContext}
        >
          <CommandPalette />
          <Outlet />
        </Root>
      </Show>
    </main>
  );
};

const AppShellView: Component = () => {
  return (
    <section class={styles.wrapper}>
      <header class={styles.header}>
        <h3 class={styles.heading}>
          <Link
            class={styles.headingLink}
            href="/"
          >
            <img
              class={styles.logoStamp}
              src="/images/branding/logo-light-stamp.svg"
              alt=""
            />
            <span class={styles.logoText}>
              <span class={styles.logoTextPrimary}>cmd palette</span>
              <span class={styles.logoTextSecondary}>for Solid.js</span>
            </span>
          </Link>
        </h3>
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
              <SocialIcon
                {...socialsData.twitter}
                class={styles.socialLink}
              />
            </li>
            <li class={styles.socialItem}>
              <SocialIcon
                {...socialsData.github}
                class={styles.socialLink}
              />
            </li>
          </ul>
        </div>
      </header>
      <Main />
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
