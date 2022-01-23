import { defineAction } from '../lib';

const firstAction = defineAction({
  id: 'first',
  title: 'First Action',
  subtitle: 'Increase counter value',
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
  title: 'Second Action',
  keywords: ['2nd', 'two'],
  shortcut: 'g p',
  run: () => {
    console.log('run second');
  },
});

const thirdAction = defineAction({
  id: 'third',
  title: 'Third Action',
  run: () => {
    console.log('run third');
  },
});

const fourthAction = defineAction({
  id: 'fourth',
  title: 'Fourth Action',
  subtitle: 'Do something random with this action',
  run: () => {
    console.log('run fourth');
  },
});

const fifthAction = defineAction({
  id: 'fifth',
  title: 'Fifth Action',
  subtitle: 'You will get another console log by clicking this',
  shortcut: 'l',
  run: () => {
    console.log('run fifth');
  },
});

const sixthAction = defineAction({
  id: 'sixth',
  title: 'Sixth Action',
  run: () => {
    console.log('run sixth');
  },
});

export const actions = {
  [firstAction.id]: firstAction,
  [secondAction.id]: secondAction,
  [thirdAction.id]: thirdAction,
  [fourthAction.id]: fourthAction,
  [fifthAction.id]: fifthAction,
  [sixthAction.id]: sixthAction,
};
