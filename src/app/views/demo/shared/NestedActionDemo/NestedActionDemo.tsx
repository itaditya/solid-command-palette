import { Component } from 'solid-js';
import { KbdShortcut } from '../../../../../lib';
import { Profile } from '../types';
import demoStyles from '../demoUtils.module.css';
import utilStyles from '../../../../utils.module.css';
import styles from './NestedActionDemo.module.css';

export interface Props {
  profile: Profile;
  onProfileChange: (event: Event) => void;
}

export const NestedActionDemo: Component<Props> = (p) => {
  return (
    <section class={demoStyles.demoSection}>
      <div>
        <h3 class={utilStyles.stripSpace}>Nested actions</h3>
        <p>
          When user selects an action but wants to further choose an option in it, this comes in
          handy.
        </p>
        <p>
          After selecting <strong>Change Profile</strong> action, user can choose between Personal &
          Work profiles.
        </p>
      </div>
      <div class={demoStyles.demoInteraction}>
        <p class={demoStyles.demoInteractionDesc}>
          Active profile is <strong>{p.profile}</strong>
        </p>
        <select
          aria-label="Select Profile"
          class={styles.profileMenu}
          value={p.profile}
          onChange={p.onProfileChange}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
        <p class={demoStyles.demoInteractionDesc}>
          Try <KbdShortcut shortcut="p p" /> / <KbdShortcut shortcut="p w" />
        </p>
      </div>
    </section>
  );
};
