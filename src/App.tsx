import type { Component } from 'solid-js';
import { Root, CommandPalette } from './lib';
import { actions } from './actions';

const App: Component = () => {
  return (
    <Root actions={actions}>
      <div>
        <h1>Hello sfgworld!</h1>;
        <CommandPalette />
      </div>
    </Root>
  );
};

export default App;
