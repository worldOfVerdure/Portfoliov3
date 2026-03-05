/*
This file controls when/how state transitions happen (not styling). The rulebook is passed to the
FormRoot component and is used by the form's internal logic to determine how to handle validation
messages, field states, and other behaviors based on user interactions and the current state of the
form.
*/
import {
  FormBehaviorRulebook,
  FormValidationMessages,
  RulebookGetValidationMessageArgs
} from '@/components/elevated/Form/helpers/types';

const getMessageFromValidity = (
  fieldName: string,
  control: HTMLInputElement | HTMLTextAreaElement,
  /*
  Optional so the rulebook can work in both modes:
  1) With custom per-field messages provided.
  2) Without any custom message config (fallback to native)
  */
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
