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

export const gentleRulebook: FormBehaviorRulebook = {
  getValidationMessage: ({ fieldName, control, validationMessages }: RulebookGetValidationMessageArgs) =>
    getMessageFromValidity(fieldName, control, validationMessages),
  getFieldState: ({ fieldName, touchedFields, errors }) => {
    if (!touchedFields[fieldName]) {
      return 'idle';
    }

    return errors[fieldName] ? 'invalid' : 'idle';
  },
  getFieldMessage: ({ fieldName, errors }) => {
    if (!errors[fieldName]) {
      return '\u00A0';
    }

    return errors[fieldName] ?? '\u00A0';
  },
  shouldClearOnEmptyBlur: () => false
};
