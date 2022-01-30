import { Component } from 'solid-js';
import { Link, Outlet } from 'solid-app-router';

const View: Component = () => {
  return (
    <div>
      <h2>App Shell World</h2>
      <Link href="/">Home</Link>
      <Link href="/demo">Demo</Link>
      <Link href="/docs">Docs</Link>
      <Link href="/docs/overview">Overview</Link>
      <Link href="/docs/installation">Installation</Link>
      <Link href="/docs/api">API</Link>
      <Outlet />
    </div>
  );
};

export default View;
