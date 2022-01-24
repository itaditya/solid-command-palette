import { Component, createSignal } from 'solid-js';
import { Root, CommandPalette } from '../lib';
import { actions } from './actions';

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [profile, setProfile] = createSignal('personal');

  const increment = () => {
    setCount((prev) => (prev += 1));
  };

  const toggleProfile = () => {
    setProfile((prev) => {
      if (prev === 'work') {
        return 'personal';
      }

      return 'work';
    });
  };

  const handleProfileChange = (event: Event) => {
    const targetElem = event.currentTarget as HTMLSelectElement;

    const newProfile = targetElem.value;
    setProfile(newProfile);
  };

  const actionsContext = {
    increment,
    profile,
    toggleProfile,
  };

  return (
    <Root actions={actions} actionsContext={actionsContext}>
      <div>
        <CommandPalette />
        <h1>Try the command palette by pressing CMD + K on Mac or Control + K on Windows</h1>
        <section>
          <h3>Trigger First Action increases the count.</h3>
          <p>
            Count is <strong>{count()}</strong>
          </p>
          <button onClick={increment}>Increase Count</button>
        </section>
        <section>
          <h3>Trigger Third Action to toggle profile</h3>
          <p>
            Active profile is <strong>{profile()}</strong>
          </p>
          <select value={profile()} onChange={handleProfileChange}>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
          <p>**Fourth Action will only appear in Work profile</p>
        </section>
      </div>
    </Root>
  );
};

export default App;
