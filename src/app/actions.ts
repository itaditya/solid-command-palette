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
  run: ({ actionsContext }) => {
    if (typeof actionsContext.toggleProfile === 'function') {
      actionsContext.toggleProfile();
    }
  },
});

const workMeetingAction = defineAction({
  id: 'work-meeting',
  title: 'Join the Standup Meeting',
  subtitle: 'Only shown in Work profile',
  shortcut: '$mod+j',
  cond: ({ actionsContext }) => {
    if (typeof actionsContext.profile !== 'function') {
      return false;
    }

    const activeProfile = actionsContext.profile();
    return activeProfile === 'work';
  },
  run: () => {
    alert('Launching meeting app!!!!');
  },
});

const contactAction = defineAction({
  id: 'contact',
  title: 'Send Message to Contact',
  subtitle: `It'll not ask for Id if you're on a receiver's profile.`,
  shortcut: 'm',
  run: ({ actionsContext }) => {
    // @ts-expect-error Need better typing for actionsContext.
    let receiverContactId = actionsContext.dynamicContext?.receiverContactId;

    if (!receiverContactId) {
      receiverContactId = prompt('Provide Contact Id');
    }

    const message = prompt(`Type the message for ${receiverContactId}`, '');
    alert(`${receiverContactId} has been sent the following message:\n${message}`);
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
      'noopener noreferrer',
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
