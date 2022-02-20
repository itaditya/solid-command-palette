import { Root } from 'solid-command-palette';

const actionsContext = {
  increment,
  muted,
  unmuteAudio,
  setProfile,
};

<Root actionsContext={actionsContext} />;
