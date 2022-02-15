import { defineAction } from '../../../lib';
import { contactAction } from './DynamicActionContextDemo/dynamicContextActions';

const incrementCounterAction = defineAction({
  id: 'increment-counter',
  title: 'Increment Counter by 1',
  subtitle: 'Hold the Command and E keys on Mac together to trigger this.',
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

const changeProfileAction = defineAction({
  id: 'change-profile',
  title: 'Change profile',
});

const setToPersonalProfileAction = defineAction({
  id: 'set-personal-profile',
  parentActionId: changeProfileAction.id,
  title: 'Set to personal profile',
  cond: ({ rootContext }) => {
    if (typeof rootContext.profile !== 'function') {
      return false;
    }

    const activeProfile = rootContext.profile();
    return activeProfile === 'work';
  },
  run: ({ rootContext }) => {
    if (typeof rootContext.setProfile === 'function') {
      rootContext.setProfile('personal');
    }
  },
});

const setToWorkProfileAction = defineAction({
  id: 'set-work-profile',
  parentActionId: changeProfileAction.id,
  title: 'Set to work profile',
  cond: ({ rootContext }) => {
    if (typeof rootContext.profile !== 'function') {
      return false;
    }

    const activeProfile = rootContext.profile();
    return activeProfile === 'personal';
  },
  run: ({ rootContext }) => {
    if (typeof rootContext.setProfile === 'function') {
      rootContext.setProfile('work');
    }
  },
});

const toggleProfileAction = defineAction({
  id: 'toggle-profile',
  parentActionId: changeProfileAction.id,
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
  subtitle: 'First press G then press H. No need to hold them together',
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

export const actions = {
  [incrementCounterAction.id]: incrementCounterAction,
  [loggerAction.id]: loggerAction,
  [changeProfileAction.id]: changeProfileAction,
  [setToPersonalProfileAction.id]: setToPersonalProfileAction,
  [setToWorkProfileAction.id]: setToWorkProfileAction,
  [toggleProfileAction.id]: toggleProfileAction,
  [workMeetingAction.id]: workMeetingAction,
  [contactAction.id]: contactAction,
  [navigationAction.id]: navigationAction,
};
