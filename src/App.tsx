import type { Component } from 'solid-js';
import { Root, CommandPalette } from './lib';

const App: Component = () => {
  return (
    <Root>
      <div>
        <h1>Hello sfgworld!</h1>;
        <CommandPalette />
      </div>
    </Root>
  );
};

export default App;
