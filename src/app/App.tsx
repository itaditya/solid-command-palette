import { Component, createSignal } from 'solid-js';
import { Root, CommandPalette } from '../lib';
import { actions } from './actions';

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount((prev) => (prev += 1));
  };

  const actionsContext = {
    increment,
  };

  return (
    <Root actions={actions} actionsContext={actionsContext}>
      <div>
        <h1>Hello {count()}</h1>
        <CommandPalette />
      </div>
    </Root>
  );
};

export default App;
