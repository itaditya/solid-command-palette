import { defineAction } from 'solid-command-palette';

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
