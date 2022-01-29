import { defineAction } from '../lib';
import { contactAction } from './DynamicActionContextDemo/dynamicContextActions';

const incrementCounterAction = defineAction({
  id: 'increment-counter',
  title: 'Increment Counter by 1',
  subtitle: 'Press CMD + E to trigger this.',
  shortcut: '$mod+e',
  run: ({ rootContext }) => {
    if (typeof rootContext.increment === 'function') {
      rootContext.increment();
    }
  },
});

const loggerAction = defineAction({
  id: 'logger',
  title: 'Log a message in the console',
  keywords: ['logger', 'print'],
  run: () => {
    console.log('run logger action');
  },
});

const toggleProfileAction = defineAction({
  id: 'toggle-profile',
  title: 'Toggle profile',
  shortcut: '$mod+Shift+p',
  run: ({ rootContext }) => {
    if (typeof rootContext.toggleProfile === 'function') {
      rootContext.toggleProfile();
    }
  },
});

const workMeetingAction = defineAction({
  id: 'work-meeting',
  title: 'Join the Standup Meeting',
  subtitle: 'Only shown in Work profile',
  shortcut: '$mod+j',
  cond: ({ rootContext }) => {
    if (typeof rootContext.profile !== 'function') {
      return false;
    }

    const activeProfile = rootContext.profile();
    return activeProfile === 'work';
  },
  run: () => {
    alert('Launching meeting app!!!!');
  },
});

const navigationAction = defineAction({
  id: 'navigate-github',
  title: 'Go to GitHub repo',
  shortcut: 'g h',
  run: () => {
    console.log('go to github');
    window.open(
      'https://github.com/itaditya/solid-command-palette',
      '_blank',
      'noopener noreferrer'
    );
  },
});

export const actions = {
  [incrementCounterAction.id]: incrementCounterAction,
  [loggerAction.id]: loggerAction,
  [toggleProfileAction.id]: toggleProfileAction,
  [workMeetingAction.id]: workMeetingAction,
  [contactAction.id]: contactAction,
  [navigationAction.id]: navigationAction,
};
