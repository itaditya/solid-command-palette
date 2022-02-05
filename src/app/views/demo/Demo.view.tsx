import { Component, createSignal, Show } from 'solid-js';
import { Root, CommandPalette, KbdShortcut } from '../../../lib';
import { actions } from './actions';
import { DynamicActionContextDemo } from './DynamicActionContextDemo/DynamicActionContextDemo';
import utilStyles from '../../utils.module.css';
import styles from './Demo.module.css';

type Profile = 'personal' | 'work';

const DemoView: Component = () => {
  const [count, setCount] = createSignal(0);
  const [profile, setProfile] = createSignal<Profile>('personal');

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

    const newProfile = targetElem.value as Profile;
    setProfile(newProfile);
  };

  const actionsContext = {
    increment,
    profile,
    toggleProfile,
  };

  return (
    <Root actions={actions} actionsContext={actionsContext}>
      <div class={styles.demoWrapper}>
        <CommandPalette />
        <section class={styles.introSection}>
          <h1 class={styles.introHeading}>
            <span>Bring it up by pressing</span>
            <KbdShortcut class={styles.introShortcutKey} shortcut="$mod+k" />
          </h1>
        </section>
        <section class={styles.demoSection}>
          <div>
            <h3 class={utilStyles.stripSpace}>Controlling application state</h3>
            <p>
              We have a <strong>count</strong> signal and an <strong>increment</strong> function to
              increase its value by 1.
            </p>
            <p>You can trigger it by clicking on the button below it.</p>
            <p>
              We have also bound this increment function to our first action and a keyboard shortcut
            </p>
          </div>
          <div class={styles.demoInteraction}>
            <strong class={styles.countValue}>{count()}</strong>
            <button class={styles.demoBtn} onClick={increment}>
              Increment count by 1
            </button>
            <p class={styles.demoInteractionDesc}>
              Try holding <KbdShortcut shortcut="$mod+e" />
            </p>
          </div>
        </section>
        <section class={styles.demoSection}>
          <div>
            <h3 class={utilStyles.stripSpace}>Conditionally enable actions</h3>
            <p>
              We have a <strong>profile</strong> signal and a <strong>toggleProfile</strong>{' '}
              function to toggle between <strong>personal</strong> & <strong>work</strong>.
            </p>
            <p>You can trigger it by selecting options in the menu, command palette & keyboard shortcut.</p>
            <p>We have also bound this profile signal to the command palette's action context.</p>
            <p>
              The <strong>Join the Standup Meeting</strong> action uses the profile value to enable
              itself only when Work profile is active.
            </p>
          </div>
          <div class={styles.demoInteraction}>
            <p class={styles.demoInteractionDesc}>
              Active profile is <strong>{profile()}</strong>
            </p>
            <select
              aria-label="Select Profile"
              class={styles.profileMenu}
              value={profile()}
              onChange={handleProfileChange}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
            </select>
            <p class={styles.demoInteractionDesc}>
              Try pressing <KbdShortcut shortcut="$mod+Shift+p" />
            </p>
            <Show when={profile() === 'work'}>
              <p class={styles.demoInteractionDesc}>
                Try pressing <KbdShortcut shortcut="$mod+j" />
              </p>
            </Show>
          </div>
        </section>
        <DynamicActionContextDemo />
      </div>
    </Root>
  );
};

export default DemoView;
