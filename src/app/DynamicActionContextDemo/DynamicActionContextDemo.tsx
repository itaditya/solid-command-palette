import { Component, createMemo, createSignal, createUniqueId, For, Show } from 'solid-js';
import { createSyncActionsContext } from '../../lib';
import styles from './DynamicActionContextDemo.module.css';

const contacts = {
  'contact-1': {
    label: 'Your details',
    details: 'My details',
  },
  'contact-2': {
    label: "Andrew's details",
    details: 'Andrew details',
  },
  'contact-3': {
    label: "Tobey's details",
    details: 'Tobey details',
  },
};

const ownContactId = 'contact-1';

const ContactItem: Component = (p) => {
  const inputId = createUniqueId();

  return (
    <li
      class={styles.contactItem}
      classList={{
        [styles.active]: p.isActive,
      }}
    >
      <label class={styles.contactLabel} htmlFor={inputId}>
        {p.label}
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

const ReceiverContactDetails: Component = (p) => {
  createSyncActionsContext(() => {
    return {
      receiverContactId: p.contactId(),
    };
  });

  return (
    <div>
      <h2>Receiver Contact Details</h2>
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

  const handleInput = (event) => {
    const newValue = event.currentTarget.value;
    setActiveContactId(newValue);
  };

  return (
    <section>
      <h3>Trigger message action by pressing letter `M`</h3>
      <p>
        If you have Andrew's or Tobey's profile already opened, it will take that contact's id
        automatically.
      </p>
      <div class={styles.contactsWrapper}>
        <aside>
          <ul class={styles.contactList}>
            <For each={Object.entries(contacts)}>
              {([contactId, contact]) => (
                <ContactItem
                  contactId={contactId}
                  isActive={contactId === activeContactId()}
                  label={contact.label}
                  activeContactId={activeContactId}
                  onInput={handleInput}
                />
              )}
            </For>
          </ul>
        </aside>
        <main class={styles.contactDetails}>
          <Show
            when={activeContactId() !== ownContactId}
            fallback={<p>{activeContactData().details}</p>}
          >
            <ReceiverContactDetails contactId={activeContactId} contactData={activeContactData} />
          </Show>
        </main>
      </div>
    </section>
  );
};
