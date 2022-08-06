import { Component, createSignal, Show } from 'solid-js';
import { useSearchParams } from 'solid-app-router';
import { Root, CommandPalette, KbdShortcut } from '../../../lib';
import { actions } from './actions';
import { NestedActionDemo } from './NestedActionDemo/NestedActionDemo';
import { DynamicActionContextDemo } from './DynamicActionContextDemo/DynamicActionContextDemo';
import { components } from './CustomComponentsDemo/components';
import { Profile } from './types';
import utilStyles from '../../utils.module.css';
import demoStyles from './demoUtils.module.css';
import styles from './Demo.module.css';

const DemoView: Component = () => {
  const [count, setCount] = createSignal(0);
  const [muted, setMuted] = createSignal(false);
  const [profile, setProfile] = createSignal<Profile>('personal');
  const [searchParams] = useSearchParams();
  let audioElem;

  const increment = () => {
    setCount((prev) => (prev += 1));
  };

  const unmuteAudio = () => {
    setMuted(false);
  };

  const handleMuteInput = () => {
    const existingState = muted();
    const newState = !existingState;
    if (newState) {
      audioElem.play();
    } else {
      audioElem.pause();
    }
    setMuted(newState);
  };

  const handleProfileChange = (event: Event) => {
    const targetElem = event.currentTarget as HTMLSelectElement;

    const newProfile = targetElem.value as Profile;
    setProfile(newProfile);
  };

  const getCustomProps = () => {
    const features = searchParams.feat || [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: Record<string, any> = {};

    if (features.includes('components')) {
      props.components = components;
    }

    if (features.includes('placeholder')) {
      props.placeholder = 'Search for an action...';
    }

    return props;
  };

  const actionsContext = {
    increment,
    muted,
    unmuteAudio,
    setProfile,
  };

  const customProps = getCustomProps();

  return (
    <Root
      actions={actions}
      actionsContext={actionsContext}
      components={customProps.components}
    >
      <div class={styles.demoWrapper}>
        <CommandPalette searchPlaceholder={customProps.placeholder} />
        <section class={styles.introSection}>
          <h1 class={styles.introHeading}>
            <span>Bring it up by pressing</span>
            <KbdShortcut
              class={styles.introShortcutKey}
              shortcut="$mod+k"
            />
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
            <p
              class={utilStyles.stripSpace}
              aria-live="polite"
              aria-atomic={true}
            >
              <span class={utilStyles.visuallyHidden}>Current count is</span>
              <strong class={styles.countValue}>{count()}</strong>
            </p>
            <button
              class={utilStyles.demoAction}
              onClick={increment}
            >
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
                  <Show
                    when={muted()}
                    fallback="Audible"
                    children="Muted"
                  />
                </strong>
                <span>(click to toggle)</span>
              </label>
              <audio
                src="/audio.mp3"
                ref={audioElem}
                controls
                loop
              />
            </div>
            <Show when={muted()}>
              <p class={demoStyles.demoInteractionDesc}>
                Press <KbdShortcut shortcut="$mod+u" /> to unmute.
              </p>
            </Show>
          </div>
        </section>
        <NestedActionDemo
          profile={profile()}
          onProfileChange={handleProfileChange}
        />
        <DynamicActionContextDemo />
      </div>
    </Root>
  );
};

export default DemoView;
