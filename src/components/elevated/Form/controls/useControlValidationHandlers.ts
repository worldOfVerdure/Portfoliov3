import type { FocusEvent, InvalidEvent } from 'react';
import { useFormState } from '../context/formContext';

const isEmpty = (value: string) => value.trim().length === 0;

export const useControlValidationHandlers = (name: string) => {
  const {
    focusedField,
    setFocusedField,
    setFieldTouched,
    setFieldError,
    validationMessages,
    rulebook
  } = useFormState();

  const handleFocus = () => {
    setFocusedField(name);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (focusedField === name) {
      setFocusedField(null);
    }

    const shouldClear = rulebook.shouldClearOnEmptyBlur?.(event.currentTarget.value) ?? isEmpty(event.currentTarget.value);

    if (shouldClear) {
      setFieldTouched(name, false);
      setFieldError(name, null);
      return;
    }

    setFieldTouched(name, true);
    setFieldError(
      name,
      rulebook.getValidationMessage({
        fieldName: name,
        control: event.currentTarget,
        validationMessages
      })
    );
  };

  const handleInvalid = (event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFieldTouched(name, true);
    setFieldError(
      name,
      rulebook.getValidationMessage({
        fieldName: name,
        control: event.currentTarget,
        validationMessages
      })
    );
  };

  return {
    onFocus: handleFocus,
    onBlur: handleBlur,
    onInvalid: handleInvalid
  };
};
