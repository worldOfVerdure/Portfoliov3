import {
  ContactFormErrors,
  ContactFormFieldName,
  ContactFormFieldState,
  ContactFormTouchedFields
} from './formTypes';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

const FIELD_NAMES = ['name', 'email', 'message'] as const;

const ERROR_MESSAGES: Record<ContactFormFieldName, Record<string, string>> = {
  name: {
    valueMissing: 'Please enter your name'
  },
  email: {
    valueMissing: 'Please enter your email',
    typeMismatch: 'Please enter a valid email address'
  },
  message: {
    valueMissing: 'Please enter a message',
    tooShort: 'Please write at least 10 characters'
  }
};

export const INITIAL_TOUCHED_FIELDS: ContactFormTouchedFields = {
  name: false,
  email: false,
  message: false
};

export const INITIAL_ERRORS: ContactFormErrors = {
  name: null,
  email: null,
  message: null
};

export const getFieldName = (name: string): ContactFormFieldName | null => {
  if ((FIELD_NAMES as readonly string[]).includes(name)) {
    return name as ContactFormFieldName;
  }

  return null;
};

export const getValidationMessage = (fieldName: ContactFormFieldName, control: FormControlElement) => {
  if (control.validity.valid) {
    return null;
  }

  const fieldMessages = ERROR_MESSAGES[fieldName];

  if (control.validity.valueMissing && fieldMessages.valueMissing) {
    return fieldMessages.valueMissing;
  }

  if (control.validity.typeMismatch && fieldMessages.typeMismatch) {
    return fieldMessages.typeMismatch;
  }

  if (control.validity.tooShort && fieldMessages.tooShort) {
    return fieldMessages.tooShort;
  }

  return control.validationMessage || 'Please check this field';
};

export const getFieldState = (
  fieldName: ContactFormFieldName,
  focusedField: ContactFormFieldName | null,
  touchedFields: ContactFormTouchedFields,
  errors: ContactFormErrors
): ContactFormFieldState => {
  if (focusedField === fieldName) {
    return 'focus';
  }

  if (!touchedFields[fieldName]) {
    return 'idle';
  }

  return errors[fieldName] ? 'invalid' : 'valid';
};

export const getFieldMessage = (fieldName: ContactFormFieldName, errors: ContactFormErrors) => {
  if (!errors[fieldName]) {
    return '\u00A0';
  }

  return errors[fieldName] ?? '\u00A0';
};

export const isEmptyFieldValue = (value: string) => value.trim().length === 0;
