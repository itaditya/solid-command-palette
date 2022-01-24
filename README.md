# Solid Command Palette

If you want to increase productivity of your power users, adding a command palette is a great way to do that. Some of the features offered by this library-

1. Define actions with a simple config.
1. Full keyboard support like open with `CMD + K`, navigate between actions using arrow keys.
1. Fuzzy search between your actions on title, subtile, keywords.
1. Bind custom keyboard shortcuts to your actions. They can be single letter, modifier combinations (`Shift+p`) or sequences `g p`.
1. Enable actions based on dynamic conditions.
1. Share your app state and methods to run any kind of functionality from actions.
1. Full static type safety across the board.

## Demo

Try the demo on [our documentation site](https://solid-command-palette.vercel.app/).

## Usage

#### Install the library

```sh
npm install solid-command-palette tinykeys fuse.js
```

* [tinykeys](https://github.com/jamiebuilds/tinykeys) (400B) provides keyboard shortcut support. You'll find it useful in other places of your app as well.
* [fuse.js](https://github.com/krisk/fuse) (5KB) provides fuzzy search support.

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
  run: ({ actionsContext }) => {
    actionsContext.increment();
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
import { actions} from './actions';
import 'solid-command-palette/pkg-dist/style.css';

const actionsContext = {
  increment() {
    console.log('increment count state by 1');
  }
};

<div class="my-app">
  <Root actions={actions} actionsContext={actionsContext}>
    <CommandPalette />
  </Root>
</div>
```
