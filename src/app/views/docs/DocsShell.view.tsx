import { Component } from 'solid-js';
import { NavLink, Outlet } from 'solid-app-router';

const DocsShellView: Component = () => {
  return (
    <section>
      <aside>
        <h2>Documentation</h2>
        <nav>
          <ul>
            <li>
              <NavLink href="/docs/overview">Overview</NavLink>
            </li>
            <li>
              <NavLink href="/docs/installation">Installation</NavLink>
            </li>
            <li>
              <NavLink href="/docs/api">API</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default DocsShellView;
