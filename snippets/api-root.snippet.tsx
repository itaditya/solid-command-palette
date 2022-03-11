import { Root, CommandPalette } from 'solid-command-palette';

/* map of all actions */
const actions = {
  [myAction.id]: myAction,
  /* ... other actions ... */
};

/* share App's signals and methods with actions */
const actionsContext = {
  count,
  incrementCount,
  deleteMessage,
};

/* Custom components to render in palette */
const components = {
  /* content for action in search result list */
  ResultContent,
};

const props = {
  actions,
  actionsContext,
  components,
};

<Root {...props}>
  <CommandPalette />
  {/* ... your app code ... */}
</Root>;
