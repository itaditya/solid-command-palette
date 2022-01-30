import { Component, lazy } from 'solid-js';
import { useRoutes, Link } from 'solid-app-router';

const routes = [
  {
    path: '/docs',
    component: lazy(() => import('./views/docs/DocsShell.view')),
    children: [
      {
        path: '/',
        component: lazy(() => import('./views/docs/Docs.view')),
      },
      {
        path: '/overview',
        component: lazy(() => import('./views/docs/introduction/Overview.view')),
      },
      {
        path: '/installation',
        component: lazy(() => import('./views/docs/introduction/Installation.view')),
      },
      { path: '/api', component: lazy(() => import('./views/docs/Api.view')) },
    ],
  },
  {
    path: '/demo',
    component: lazy(() => import('./views/demo/Demo.view')),
  },
  {
    path: '/',
    component: lazy(() => import('./views/Home.view')),
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/demo">Demo</Link>
      <Link href="/docs">Docs</Link>
      <Link href="/docs/overview">Overview</Link>
      <Link href="/docs/installation">Installation</Link>
      <Link href="/docs/api">API</Link>
      <Routes />
    </div>
  );
};

export default App;
