import { Root, CommandPalette } from 'solid-command-palette';
import { actions } from './actions';
import 'solid-command-palette/pkg-dist/style.css';

const App = () => {
  const actionsContext = {
    increment() {
      console.log('increment count state by 1');
    },
  };

  return (
    <div class="my-app">
      <Root
        actions={actions}
        actionsContext={actionsContext}
      >
        <CommandPalette />
      </Root>
    </div>
  );
};
