import { Component, lazy } from 'solid-js';
import { RouteDefinition, useRoutes } from 'solid-app-router';
import AppShellView from './views/app/AppShell.view';
import DocsShellView from './views/docs/DocsShell/DocsShell.view';
import DocsView from './views/docs/Docs.view';
import ApiView from './views/docs/Api/Api.view';
import HomeView from './views/home/Home.view';

const routes: Array<RouteDefinition> = [
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
            component: DocsView,
          },
          {
            path: '/overview',
            component: lazy(() => import('./views/docs/introduction/Overview.view')),
          },
          {
            path: '/installation',
            component: lazy(() => import('./views/docs/introduction/Installation.view')),
          },
          {
            path: '/api',
            children: [
              { path: '/', component: ApiView },
              {
                path: '/define-action',
                component: lazy(() => import('./views/docs/Api/ApiDefineAction.view')),
              },
              { path: '/root', component: lazy(() => import('./views/docs/Api/ApiRoot.view')) },
              {
                path: '/command-palette',
                component: lazy(() => import('./views/docs/Api/ApiCommandPalette.view')),
              },
            ],
          },
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
