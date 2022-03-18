import { defineAction } from 'solid-command-palette';

export const myAction = defineAction({
  /* Unique identifier for your action */
  id: 'my-action',

  /* Nest current action inside a parent action */
  parentActionId: 'my-parent-action',

  /* Short heading. Visible and Searchable */
  title: 'My Action',

  /* Long description. Visible and Searchable */
  subtitle: 'My Action',

  /* Other words to identify action. Hidden but Searchable */
  keywords: ['example', 'command'],

  /* Keyboard shortcut for action. $mod = Cmd (Mac) / Ctrl (Win) */
  shortcut: '$mod+e',

  /* Condition for allowing action */
  cond: ({ actionId, rootContext, dynamicContext }) => {
    const isAllowed = someLogic({ rootContext, dynamicContext });
    return isAllowed;
  },

  /* Code to execute when action is triggered */
  run: ({ actionId, rootContext, dynamicContext }) => {
    console.log('Run', actionId);
    rootContext.incrementCount();
    rootContext.deleteMessage(dynamicContext.messageId);
  },
});
