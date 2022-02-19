import { defineAction } from '../../../../lib';

export const setProfileAction = defineAction({
  id: 'set-profile',
  title: 'Set profile',
});

export const setToPersonalProfileAction = defineAction({
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

export const setToWorkProfileAction = defineAction({
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
