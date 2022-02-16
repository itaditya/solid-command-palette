import { Component, createSignal, Show } from 'solid-js';
import { Root, CommandPalette, KbdShortcut } from '../../../lib';
import { actions } from './actions';
import { DynamicActionContextDemo } from './DynamicActionContextDemo/DynamicActionContextDemo';
import utilStyles from '../../utils.module.css';
import demoStyles from './demoUtils.module.css';
import styles from './Demo.module.css';

type Profile = 'personal' | 'work';

const DemoView: Component = () => {
  const [count, setCount] = createSignal(0);
  const [muted, setMuted] = createSignal(false);
  const [profile, setProfile] = createSignal<Profile>('personal');

  const increment = () => {
    setCount((prev) => (prev += 1));
  };

  const unmuteAudio = () => {
    setMuted(false);
  };

  const handleMuteInput = () => {
    setMuted((old) => !old);
  };

  const handleProfileChange = (event: Event) => {
    const targetElem = event.currentTarget as HTMLSelectElement;

    const newProfile = targetElem.value as Profile;
    setProfile(newProfile);
  };

  const actionsContext = {
    increment,
    muted,
    unmuteAudio,
    setProfile,
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
        <section class={demoStyles.demoSection}>
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
          <div class={demoStyles.demoInteraction}>
            <p class={utilStyles.stripSpace} aria-live="polite" aria-atomic={true}>
              <span class={utilStyles.visuallyHidden}>Current count is</span>
              <strong class={styles.countValue}>{count()}</strong>
            </p>
            <button class={utilStyles.demoAction} onClick={increment}>
              Increment Count
            </button>
            <p class={demoStyles.demoInteractionDesc}>
              Try holding <KbdShortcut shortcut="$mod+e" />
            </p>
          </div>
        </section>
        <section class={demoStyles.demoSection}>
          <div>
            <h3 class={utilStyles.stripSpace}>Conditionally enable actions</h3>
            <p>
              The <strong>Unmute Audio</strong> action is only enabled when the muted signal has
              value <strong>true</strong>.
            </p>
            <p>
              The action's <strong>cond</strong> & <strong>run</strong> functions can use latest
              application state to enable actions or change behavior.
            </p>
          </div>
          <div class={demoStyles.demoInteraction}>
            <div>
              <label
                htmlFor="audio-mute"
                class={`${styles.muteLabel} ${demoStyles.demoInteractionDesc}`}
              >
                <input
                  type="checkbox"
                  class={utilStyles.visuallyHidden}
                  name="audio-mute"
                  id="audio-mute"
                  checked={muted()}
                  onInput={handleMuteInput}
                />
                <strong>
                  <Show when={muted()} fallback="Audible" children="Muted" />
                </strong>
                <span>(click to toggle)</span>
              </label>
            </div>
            <Show when={muted()}>
              <p class={demoStyles.demoInteractionDesc}>
                Press <KbdShortcut shortcut="$mod+u" /> to unmute.
              </p>
            </Show>
          </div>
        </section>
        <section class={demoStyles.demoSection}>
          <div>
            <h3 class={utilStyles.stripSpace}>Nested actions</h3>
            <p>
              When user selects an action but wants to further choose an option in it, this comes in
              handy.
            </p>
            <p>
              After selecting <strong>Change Profile</strong> action, user can choose between
              Personal & Work profiles.
            </p>
          </div>
          <div class={demoStyles.demoInteraction}>
            <p class={demoStyles.demoInteractionDesc}>
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
            <p class={demoStyles.demoInteractionDesc}>
              Try <KbdShortcut shortcut="p p" /> / <KbdShortcut shortcut="p w" />
            </p>
          </div>
        </section>
        <DynamicActionContextDemo />
      </div>
    </Root>
  );
};

export default DemoView;
