import { createSignal, Component } from 'solid-js';

export const CommandPalette: Component = () => {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <h1>CommandPalette!</h1>
      <button onClick={() => setCount((prev) => (prev += 1))}>Count {count()}</button>
    </div>
  );
};
