import { defineAction } from '../../../lib';
import { contactAction } from './DynamicActionContextDemo/dynamicContextActions';
import { nestedActionsConfig } from './NestedActionDemo/nestedActions';

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
  ...nestedActionsConfig,
  [contactAction.id]: contactAction,
  [navigationAction.id]: navigationAction,
};
