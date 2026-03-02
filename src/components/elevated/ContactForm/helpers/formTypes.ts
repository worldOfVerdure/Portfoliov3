import * as Form from '@radix-ui/react-form';
import { ComponentProps } from 'react';

export type ContactFormSubmitEvent = Parameters<
  NonNullable<ComponentProps<typeof Form.Root>['onSubmit']>
>[0];

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormFieldName = 'name' | 'email' | 'message';

export type ContactFormFieldState = 'idle' | 'focus' | 'valid' | 'invalid';

export type ContactFormErrors = Record<ContactFormFieldName, string | null>;

export type ContactFormTouchedFields = Record<ContactFormFieldName, boolean>;

export type ContactFormSlots = {
  form?: string;
  fieldset?: string;
  legend?: string;
  field?: string;
  fieldHeader?: string;
  label?: string;
  control?: string;
  textarea?: string;
  message?: string;
  actions?: string;
  submit?: string;
};

export type ContactFormProps = {
  className?: string;
  classes?: ContactFormSlots;
  submitLabel?: string;
  onSubmit?: (values: ContactFormValues) => void;
};
