import { defineAction } from '../../../../lib';
import { contactActionId } from './data';

export const contactAction = defineAction({
  id: contactActionId,
  title: 'Send Message to Contact',
  subtitle: `It'll not ask for Id if you're on a receiver's profile.`,
  shortcut: 'm',
  run: ({ dynamicContext }) => {
    let receiverContactId = dynamicContext.receiverContactId;

    if (!receiverContactId) {
      receiverContactId = prompt('Provide Contact Id');
    }

    const message = prompt(`Type the message for ${receiverContactId}`, '');
    alert(`${receiverContactId} has been sent the following message:\n${message}`);
  },
});
