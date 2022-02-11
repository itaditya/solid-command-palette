<p align="center">
  <br />
  <img src="../public/images/branding/logo-light-horizontal.svg#gh-light-mode-only" width="650" alt="Command Palette for Solid.js" />
  <img src="../public/images/branding/logo-dark-horizontal.svg#gh-dark-mode-only" width="650" alt="Command Palette for Solid.js" />
  <br />
  <br />
</p>

<h1 align="center">Boost your user's productivity by 10x 🚀</h1>

<br />

### Some of the features offered by this library-

1. Define actions with a simple config.
1. Full keyboard support like open with <kbd>CMD</kbd> + <kbd>K</kbd>, navigate between actions using arrow keys.
1. Fuzzy search between your actions on title, subtile, keywords.
1. Bind custom keyboard shortcuts to your actions. They can be single letter, modifier combinations <kbd>Shift</kbd> + <kbd>P</kbd> or sequences <kbd>g</kbd> <kbd>p</kbd>.
1. Enable actions based on dynamic conditions.
1. Share your app state and methods to run any kind of functionality from actions.
1. Full static type safety across the board.

## Demo

Try the demo on [our documentation site](https://solid-command-palette.vercel.app/demo).

## Usage

#### Install the library

```sh
# Core Library
npm install solid-command-palette

# Peer Dependencies
npm install solid-transition-group tinykeys fuse.js
```

- [solid-transition-group](https://github.com/solidjs/solid-transition-group) (1.6KB): provides advanced animation support. It's the official recommendation from SolidJS team so you might be using it already.
- [tinykeys](https://github.com/jamiebuilds/tinykeys) (700B): provides keyboard shortcut support. You can use this in your app for all kinds of keybindings.
- [fuse.js](https://github.com/krisk/fuse) (5KB): provides fuzzy search support to find relevant actions.

#### Integrate with app

```jsx
// define actions in one module say `actions.ts`

const minimalAction = defineAction({
  id: 'minimal',
  title: 'Minimal Action',
  run: () => {
    console.log('ran minimal action');
  },
});

const incrementCounterAction = defineAction({
  id: 'increment-counter',
  title: 'Increment Counter by 1',
  subtitle: 'Press CMD + E to trigger this.',
  shortcut: '$mod+e', // $mod = Command on Mac & Control on Windows.
  run: ({ rootContext }) => {
    rootContext.increment();
  },
});

export const actions = {
  [minimalAction.id]: minimalAction,
  [incrementCounterAction.id]: incrementCounterAction,
};
```

```jsx
// render inside top level Solid component

import { Root, CommandPalette } from 'solid-command-palette';
import { actions } from './actions';
import 'solid-command-palette/pkg-dist/style.css';

const App = () => {
  const actionsContext = {
    increment() {
      console.log('increment count state by 1');
    },
  };

  return (
    <div class="my-app">
      <Root actions={actions} actionsContext={actionsContext}>
        <CommandPalette />
      </Root>
    </div>
  );
};
```
