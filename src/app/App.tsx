import { Component, lazy } from 'solid-js';
import { useRoutes } from 'solid-app-router';
import AppShellView from './views/app/AppShell.view';
import DocsShellView from './views/docs/DocsShell/DocsShell.view';
import HomeView from './views/Home.view';

const routes = [
  {
    path: '/',
    component: AppShellView,
    children: [
      {
        path: '/docs',
        component: DocsShellView,
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
        component: HomeView,
      },
    ],
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);

  return <Routes />;
};

export default App;
