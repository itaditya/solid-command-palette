import { Root } from 'solid-command-palette';

<Root
  /* map of all actions */
  actions={{
    [myAction.id]: myAction,
    /* ... other actions ... */
  }}
  /* share App's signals and methods with actions */
  actionsContext={{
    count,
    incrementCount,
    deleteMessage,
  }}
  /* Custom components to render in palette */
  components={{
    /* content for action in search result list */
    ResultContent,
  }}
/>;
