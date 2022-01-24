import { defineAction } from '../lib';

const incrementCounterAction = defineAction({
  id: 'increment-counter',
  title: 'Increment Counter by 1',
  subtitle: 'Press CMD + E to trigger this.',
  shortcut: '$mod+e',
  run: ({ actionsContext }) => {
    if (typeof actionsContext.increment === 'function') {
      actionsContext.increment();
    }
  },
});

const secondAction = defineAction({
  id: 'second',
  title: 'Second Action',
  keywords: ['2nd', 'two'],
  run: () => {
    console.log('run second');
  },
});

const toggleProfileAction = defineAction({
  id: 'toggle-profile',
  title: 'Toggle profile',
  shortcut: '$mod+Shift+p',
  run: ({ actionsContext }) => {
    if (typeof actionsContext.toggleProfile === 'function') {
      actionsContext.toggleProfile();
    }
  },
});

const fourthAction = defineAction({
  id: 'fourth',
  title: 'Fourth Action',
  subtitle: 'Do something random with this action',
  cond: ({ actionsContext }) => {
    if (typeof actionsContext.profile !== 'function') {
      return false;
    }

    const activeProfile = actionsContext.profile();
    return activeProfile === 'work';
  },
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
  shortcut: 'g p',
  run: () => {
    console.log('run sixth');
  },
});

export const actions = {
  [incrementCounterAction.id]: incrementCounterAction,
  [secondAction.id]: secondAction,
  [toggleProfileAction.id]: toggleProfileAction,
  [fourthAction.id]: fourthAction,
  [fifthAction.id]: fifthAction,
  [sixthAction.id]: sixthAction,
};
