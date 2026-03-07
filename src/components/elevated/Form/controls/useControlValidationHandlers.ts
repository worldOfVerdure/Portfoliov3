import { FocusEvent, InvalidEvent } from 'react';
import { useFormState } from '../context/formContext';
import { type SharedControlProps } from '../helpers/types';

const isEmpty = (value: string) => value.trim().length === 0;

export const useControlValidationHandlers = (name: string, props: SharedControlProps) => {
  const {
    focusedField,
    setFocusedField,
    setFieldTouched,
    setFieldError,
    validationMessages,
    rulebook
  } = useFormState();

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(name);
    props.onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (focusedField === name) {
      setFocusedField(null);
    }

    const shouldClear = rulebook.shouldClearOnEmptyBlur?.(event.currentTarget.value) ?? isEmpty(event.currentTarget.value);

    if (shouldClear) {
      setFieldTouched(name, false);
      setFieldError(name, null);
      props.onBlur?.(event);
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
    props.onBlur?.(event);
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
    props.onInvalid?.(event);
  };

  return {
    onFocus: handleFocus,
    onBlur: handleBlur,
    onInvalid: handleInvalid
  };
};
