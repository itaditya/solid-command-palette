import { ContactId, ContactsMap } from './types';

export const ownContactId: ContactId = 'contact-tom';

export const contacts: ContactsMap = {
  'contact-tom': {
    label: 'Me',
    details: 'I am the friendly neighbor-hood Spider-Man who fought Thanos.',
  },
  'contact-andrew': {
    label: 'Andrew',
    details: "He's the Amazing Spider-Man with deep regrets.",
  },
  'contact-tobey': {
    label: 'Tobey',
    details: "He's the youth pastor who shoots webbing out of his hands.",
  },
};

export const contactActionId = 'message-to-contact-action';
