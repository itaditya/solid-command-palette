import { ContactId, ContactsMap } from './types';

export const ownContactId: ContactId = 'contact-1';

export const contacts: ContactsMap = {
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

export const contactActionId = 'message-to-contact-action';
