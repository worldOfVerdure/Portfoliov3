<<<<<<< HEAD
import type { FocusEvent, InvalidEvent } from 'react';
=======
import type { ChangeEvent, FocusEvent, InvalidEvent } from 'react';
>>>>>>> upstream/main
import { useFormState } from '../../context/formContext';

const isEmpty = (value: string) => value.trim().length === 0;

const typingInputTypes = new Set(['insertText', 'insertCompositionText', 'deleteContentBackward', 'deleteContentForward']);
const pasteLikeInputTypes = new Set(['insertFromPaste', 'insertFromDrop', 'insertReplacementText']);

const isTypingInputType = (inputType: string | null | undefined) => {
  if (!inputType) {
    return false;
  }

  return typingInputTypes.has(inputType);
};

const isPasteLikeInputType = (inputType: string | null | undefined) => {
  if (!inputType) {
    return false;
  }

  return pasteLikeInputTypes.has(inputType);
};

const hasAutocompleteEnabled = (control: HTMLInputElement | HTMLTextAreaElement) => {
  const autocomplete = control.autocomplete.trim().toLowerCase();

  return autocomplete !== 'off';
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
    const control = event.currentTarget;
    const inputType = (event.nativeEvent as InputEvent).inputType ?? null;
    const looksLikeAutofillEvent = !inputType && !isEmpty(control.value) && hasAutocompleteEnabled(control);

    if (
      touchedFields[name] ||
      isEmpty(control.value) ||
      !hasAutocompleteEnabled(control) ||
      (!inputType && !looksLikeAutofillEvent) ||
      isTypingInputType(inputType) ||
      isPasteLikeInputType(inputType)
    ) return;

    setTouchedWrapper(name, true);
    setErrorWrapper(
      name,
      rulebook.getValidationMessage({
        fieldName: name,
        control,
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
