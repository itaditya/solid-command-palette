import { defineAction } from '../../../../../lib';

const setProfileAction = defineAction({
  id: 'set-profile',
  title: 'Set profile',
  subtitle: 'Select this and then choose one of the options',
  shortcut: 'p s',
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

const configureProfileAction = defineAction({
  id: 'configure-profile',
  title: 'Configure profile',
  subtitle: 'Select this to try 2 levels of nested actions',
});

const configurePersonalProfileAction = defineAction({
  id: 'configure-personal-profile',
  parentActionId: configureProfileAction.id,
  title: 'Configure Personal profile',
});

const toggleWifiPersonalAction = defineAction({
  id: 'toggle-wifi-personal',
  parentActionId: configurePersonalProfileAction.id,
  title: 'Toggle Wi-Fi',
  subtitle: 'Configure Wi-Fi settings in Personal profile',
  run: () => {
    alert('Wifi in Personal profile has been toggled!');
  },
});

const toggleAirplanePersonalAction = defineAction({
  id: 'toggle-airplane-personal',
  parentActionId: configurePersonalProfileAction.id,
  title: 'Toggle Airplane mode',
  subtitle: 'Configure Airplane mode settings in Personal profile',
  run: () => {
    alert('Airplane mode in Personal profile has been toggled!');
  },
});

const configureWorkProfileAction = defineAction({
  id: 'configure-work-profile',
  parentActionId: configureProfileAction.id,
  title: 'Configure Work profile',
});

const toggleWifiWorkAction = defineAction({
  id: 'toggle-wifi-work',
  parentActionId: configureWorkProfileAction.id,
  title: 'Toggle Wi-Fi',
  subtitle: 'Configure Wi-Fi settings in Work profile',
  run: () => {
    alert('Wifi in Work profile has been toggled!');
  },
});

const toggleAirplaneWorkAction = defineAction({
  id: 'toggle-airplane-work',
  parentActionId: configureWorkProfileAction.id,
  title: 'Toggle Airplane mode',
  subtitle: 'Configure Airplane mode settings in Work profile',
  run: () => {
    alert('Airplane mode in Work profile has been toggled!');
  },
});

export const nestedActionsConfig = {
  [setProfileAction.id]: setProfileAction,
  [setToPersonalProfileAction.id]: setToPersonalProfileAction,
  [setToWorkProfileAction.id]: setToWorkProfileAction,
  [configureProfileAction.id]: configureProfileAction,
  [configurePersonalProfileAction.id]: configurePersonalProfileAction,
  [toggleWifiPersonalAction.id]: toggleWifiPersonalAction,
  [toggleAirplanePersonalAction.id]: toggleAirplanePersonalAction,
  [configureWorkProfileAction.id]: configureWorkProfileAction,
  [toggleWifiWorkAction.id]: toggleWifiWorkAction,
  [toggleAirplaneWorkAction.id]: toggleAirplaneWorkAction,
};
