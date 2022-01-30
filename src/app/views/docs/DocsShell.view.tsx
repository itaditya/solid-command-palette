import { Component } from 'solid-js';
import { Outlet } from 'solid-app-router';

const DocsShellView: Component = () => {
  return (
    <div>
      <h2>Docs Shell World</h2>
      <Outlet />
    </div>
  );
};

export default DocsShellView;
