/*
This file controls when/how state transitions happen (not styling). The rulebook is passed to the
FormRoot component and is used by the form's internal logic to determine how to handle validation
messages, field states, and other behaviors based on user interactions and the current state of the
form.
This file does not contain any styling information; it solely defines the behavior of the form
fields and how validation messages are generated and displayed.
The contactRulebook defines the behavior for a contact form, specifying how validation messages
are generated based on the validity of the form controls, how field states are determined based
on user interactions, and when to clear field values on blur events.
*/
import {
  FormBehaviorRulebook,
  FormValidationMessages,
  RulebookGetValidationMessageArgs
} from '@/components/elevated/Form/helpers/types';

const getMessageFromValidity = (
  fieldName: string,
  control: HTMLInputElement | HTMLTextAreaElement,
  validationMessages?: FormValidationMessages
) => {
  if (control.validity.valid) {
    return null;
  }

  const fieldMessages = validationMessages?.[fieldName];

  if (control.validity.valueMissing && fieldMessages?.valueMissing) {
    return fieldMessages.valueMissing;
  }

  if (control.validity.typeMismatch && fieldMessages?.typeMismatch) {
    return fieldMessages.typeMismatch;
  }

  if (control.validity.tooShort && fieldMessages?.tooShort) {
    return fieldMessages.tooShort;
  }

  if (control.validity.patternMismatch && fieldMessages?.patternMismatch) {
    return fieldMessages.patternMismatch;
  }

  return control.validationMessage || 'Please check this field';
};

export const contactRulebook: FormBehaviorRulebook = {
  getValidationMessage: ({ fieldName, control, validationMessages }: RulebookGetValidationMessageArgs) =>
  getMessageFromValidity(fieldName, control, validationMessages),
  getFieldState: ({ fieldName, focusedField, touchedFields, errors }) => {
    if (focusedField === fieldName) {
      return 'focus';
    }

    if (!touchedFields[fieldName]) {
      return 'idle';
    }

    return errors[fieldName] ? 'invalid' : 'valid';
  },
  getFieldMessage: ({ fieldName, errors }) => {
    if (!errors[fieldName]) {
      return '\u00A0';
    }

    return errors[fieldName] ?? '\u00A0';
  },
  shouldClearOnEmptyBlur: (value: string) => value.trim().length === 0
};
