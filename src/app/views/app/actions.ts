import { defineAction } from '../../../lib';

const homeAction = defineAction({
  id: 'navigate-home',
  title: 'Go to Home',
  subtitle: 'Navigate to the homepage.',
  shortcut: 'g h',
  run({ rootContext }) {
    if (typeof rootContext.navigate === 'function') {
      rootContext.navigate('/');
    }
  },
});

const docsAction = defineAction({
  id: 'navigate-docs',
  title: 'Go to Docs',
  subtitle: 'Read the documentation for Solid Command Palette',
  keywords: ['api', 'install', 'start', 'overview'],
  shortcut: 'g d',
  run({ rootContext }) {
    if (typeof rootContext.navigate === 'function') {
      rootContext.navigate('/docs');
    }
  },
});

const demoAction = defineAction({
  id: 'navigate-demo',
  title: 'Try the Demo',
  subtitle: 'Explore the demo which showcases all features.',
  run({ rootContext }) {
    if (typeof rootContext.navigate === 'function') {
      rootContext.navigate('/demo');
    }
  },
});

const githubAction = defineAction({
  id: 'navigate-github',
  title: 'Go to GitHub repo',
  keywords: ['oss', 'source', 'code'],
  shortcut: 'g h',
  run: () => {
    window.open(
      'https://github.com/itaditya/solid-command-palette',
      '_blank',
      'noopener noreferrer'
    );
  },
});

const npmAction = defineAction({
  id: 'navigate-npm',
  title: 'Go to NPM package',
  keywords: ['oss', 'package', 'pkg'],
  shortcut: 'g n',
  run: () => {
    window.open(
      'https://www.npmjs.com/package/solid-command-palette',
      '_blank',
      'noopener noreferrer'
    );
  },
});

export const actions = {
  [homeAction.id]: homeAction,
  [docsAction.id]: docsAction,
  [demoAction.id]: demoAction,
  [githubAction.id]: githubAction,
  [npmAction.id]: npmAction,
};
