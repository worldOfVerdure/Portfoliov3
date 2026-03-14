<<<<<<< HEAD
import type { FocusEvent, InvalidEvent } from 'react';
=======
import type { ChangeEvent, FocusEvent, InvalidEvent } from 'react';
>>>>>>> upstream/main
import { useFormState } from '../../context/formContext';

const isEmpty = (value: string) => value.trim().length === 0;

<<<<<<< HEAD
=======
const isAutofillChange = (control: HTMLInputElement | HTMLTextAreaElement) => {
  // Browser autofill should set validation state without enabling live typing validation.
  const autofillSelectors = [':autofill', ':-webkit-autofill'];

  return autofillSelectors.some((selector) => {
    try {
      return control.matches(selector);
    } catch {
      return false;
    }
  });
};

>>>>>>> upstream/main
export const useControlValidationHandlers = (name: string) => {
  const {
    focusedField,
    touchedFields,
    setFocusedField,
    setTouchedWrapper,
    setErrorWrapper,
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

    if (shouldClear && !touchedFields[name]) {
      setTouchedWrapper(name, false);
      setErrorWrapper(name, null);
      return;
    }

    setTouchedWrapper(name, true);
    setErrorWrapper(
      name,
      rulebook.getValidationMessage({
        fieldName: name,
        control: event.currentTarget,
        validationMessages
      })
    );
  };

<<<<<<< HEAD
=======
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isAutofillChange(event.currentTarget)) {
      return;
    }

    setTouchedWrapper(name, true);
    setErrorWrapper(
      name,
      rulebook.getValidationMessage({
        fieldName: name,
        control: event.currentTarget,
        validationMessages
      })
    );
  };

>>>>>>> upstream/main
  const handleInvalid = (event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouchedWrapper(name, true);
    setErrorWrapper(
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
<<<<<<< HEAD
=======
    onChange: handleChange,
>>>>>>> upstream/main
    onInvalid: handleInvalid
  };
};
