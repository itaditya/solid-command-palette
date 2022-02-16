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

const unmuteAudioAction = defineAction({
  id: 'unmute-audio',
  title: 'Unmute Audio',
  subtitle: 'Only shown when you have muted the audio',
  shortcut: '$mod+u',
  cond: ({ rootContext }) => {
    if (typeof rootContext.muted !== 'function') {
      return false;
    }

    return rootContext.muted();
  },
  run: ({ rootContext }) => {
    if (typeof rootContext.unmuteAudio === 'function') {
      rootContext.unmuteAudio();
    }
  },
});

const setProfileAction = defineAction({
  id: 'set-profile',
  title: 'Set profile',
});

const setToPersonalProfileAction = defineAction({
  id: 'set-personal-profile',
  parentActionId: setProfileAction.id,
  title: 'Set to Personal profile',
  shortcut: 'p p',
  run: ({ rootContext }) => {
    if (typeof rootContext.setProfile === 'function') {
      rootContext.setProfile('personal');
    }
  },
});

const setToWorkProfileAction = defineAction({
  id: 'set-work-profile',
  parentActionId: setProfileAction.id,
  title: 'Set to Work profile',
  shortcut: 'p w',
  run: ({ rootContext }) => {
    if (typeof rootContext.setProfile === 'function') {
      rootContext.setProfile('work');
    }
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
  [unmuteAudioAction.id]: unmuteAudioAction,
  [setProfileAction.id]: setProfileAction,
  [setToPersonalProfileAction.id]: setToPersonalProfileAction,
  [setToWorkProfileAction.id]: setToWorkProfileAction,
  [contactAction.id]: contactAction,
  [navigationAction.id]: navigationAction,
};
