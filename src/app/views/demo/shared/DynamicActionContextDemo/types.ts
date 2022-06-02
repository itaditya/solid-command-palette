import { JSX, Accessor } from 'solid-js';

export type ContactId = string;

export type ContactData = {
  label: string;
  details: string;
};

export type ContactsMap = Record<ContactId, ContactData>;

export type InputEventHandler = JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;

export type ContactItemProps = {
  contactId: ContactId;
  contactData: ContactData;
  isActive: boolean;
  onInput: InputEventHandler;
};

export type ReceiverContactDetailsProps = {
  contactId: Accessor<ContactId>;
  contactData: Accessor<ContactData>;
};
