import { defineAction } from '../../../../lib';
import { contactActionId, contacts } from './data';

export const contactAction = defineAction({
  id: contactActionId,
  title: 'Send Message to Contact',
  subtitle: `It'll not ask for Id if you're on a receiver's profile.`,
  shortcut: 'm',
  run: ({ dynamicContext }) => {
    let receiverContactId = dynamicContext.receiverContactId as string;

    if (!receiverContactId) {
      const contactId = prompt('Provide Contact Id of the receiver', '');

      if (contactId) {
        receiverContactId = contactId;
      }
    }

    const contactLabel = contacts[receiverContactId]?.label || receiverContactId;
    const message = prompt(`Type the message for ${contactLabel}`, 'Hello there!');
    alert(`${contactLabel} has been sent the following message:\n${message}`);
  },
});
