import { defineAction } from './lib';

const firstAction = defineAction({
  id: 'first',
  run: () => {
    console.log('run first');
  },
});

const secondAction = defineAction({
  id: 'second',
  run: () => {
    console.log('run second');
  },
});

export const actions = {
  [firstAction.id]: firstAction,
  [secondAction.id]: secondAction,
};
