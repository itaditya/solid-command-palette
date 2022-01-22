import { defineAction } from '../lib';

const firstAction = defineAction({
  id: 'first',
  shortcut: '$mod+e',
  run: ({ actionsContext }) => {
    console.log('run first');

    if (typeof actionsContext.increment === 'function') {
      actionsContext.increment();
    }
  },
});

const secondAction = defineAction({
  id: 'second',
  shortcut: 'g p',
  run: () => {
    console.log('run second');
  },
});

export const actions = {
  [firstAction.id]: firstAction,
  [secondAction.id]: secondAction,
};
