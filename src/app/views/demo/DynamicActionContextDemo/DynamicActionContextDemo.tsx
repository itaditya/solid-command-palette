import { Component, createMemo, createSignal, createUniqueId, For, Show } from 'solid-js';
import { KbdShortcut, createSyncActionsContext } from '../../../../lib';
import { ownContactId, contacts, contactActionId } from './data';
import { InputEventHandler, ContactItemProps, ReceiverContactDetailsProps } from './types';
import demoStyles from '../demoUtils.module.css';
import utilStyles from '../../../utils.module.css';
import styles from './DynamicActionContextDemo.module.css';

const ContactItem: Component<ContactItemProps> = (p) => {
  const inputId = createUniqueId();

  return (
    <li
      class={styles.contactItem}
      classList={{
        [styles.active]: p.isActive,
      }}
    >
      <label
        class={styles.contactLabel}
        htmlFor={inputId}
      >
        {p.contactData.label}
      </label>
      <input
        id={inputId}
        class={styles.contactInput}
        type="radio"
        name="contact-option"
        checked={p.isActive}
        value={p.contactId}
        onInput={p.onInput}
      />
    </li>
  );
};

const ReceiverContactDetails: Component<ReceiverContactDetailsProps> = (p) => {
  createSyncActionsContext(contactActionId, () => {
    return {
      receiverContactId: p.contactId(),
    };
  });

  return (
    <div>
      <h2 class={utilStyles.stripSpace}>Receiver Details</h2>
      <p>{p.contactData().details}</p>
    </div>
  );
};

export const DynamicActionContextDemo: Component = () => {
  const [activeContactId, setActiveContactId] = createSignal(ownContactId);

  const activeContactData = createMemo(() => {
    const activeContactIdValue = activeContactId();
    const activeContactData = contacts[activeContactIdValue];

    return activeContactData;
  });

  const handleInput: InputEventHandler = (event) => {
    const newValue = event.currentTarget.value;
    setActiveContactId(newValue);
  };

  function renderOwnDetails() {
    return (
      <div>
        <h2 class={utilStyles.stripSpace}>Personal Details</h2>
        <p>{activeContactData().details}</p>
      </div>
    );
  }

  return (
    <section class={demoStyles.demoSection}>
      <div>
        <h3>Dynamically set action context</h3>
        <p>
          When you select Andrew or Tobey, the <strong>ReceiverContactDetails</strong> is rendered.
        </p>
        <p>
          While this component is rendered, the profile details are shared using dynamic action
          context.
        </p>
        <p>
          Try the <strong>Send Message to Contact</strong> action once after selecting each profile.
        </p>
        <p>
          If you have Andrew's or Tobey's profile already opened, their contact id will already be
          taken and you'll skip one step.
        </p>
      </div>
      <div class={demoStyles.demoInteraction}>
        <div class={styles.contactsWrapper}>
          <aside>
            <ul class={styles.contactList}>
              <For each={Object.entries(contacts)}>
                {([contactId, contact]) => (
                  <ContactItem
                    contactId={contactId}
                    isActive={contactId === activeContactId()}
                    contactData={contact}
                    onInput={handleInput}
                  />
                )}
              </For>
            </ul>
          </aside>
          <main class={styles.contactDetails}>
            <Show
              when={activeContactId() !== ownContactId}
              fallback={renderOwnDetails()}
            >
              <ReceiverContactDetails
                contactId={activeContactId}
                contactData={activeContactData}
              />
            </Show>
          </main>
        </div>
        <p class={demoStyles.demoInteractionDesc}>
          Try pressing <KbdShortcut shortcut="m" />
        </p>
      </div>
    </section>
  );
};
