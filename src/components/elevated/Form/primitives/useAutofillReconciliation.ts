import { useCallback, useEffect, useRef } from 'react';
import { useFormRegistryActions } from '../context/formRegistryContext';
import { useFormState } from '../context/formContext';

const textLikeInputTypes = new Set([
  'text',
  'email',
  'search',
  'tel',
  'url',
  'password',
  'number',
  'date',
  'datetime-local',
  'month',
  'time',
  'week'
]);

type UseAutofillReconciliationArgs = {
  formRootRef: React.RefObject<HTMLFormElement | null>;
  enabled: boolean;
  autoFocusMessage?: boolean;
  messageFieldName?: string;
};

export function useAutofillReconciliation({
  formRootRef,
  enabled,
  autoFocusMessage = false,
  messageFieldName
}: UseAutofillReconciliationArgs) {
  const { getEntries } = useFormRegistryActions();
  const {
    touchedFields,
    setTouchedWrapper,
    setErrorWrapper,
    validationMessages,
    rulebook
  } = useFormState();

  const touchedRef = useRef(touchedFields);
  touchedRef.current = touchedFields;

  const setTouchedRef = useRef(setTouchedWrapper);
  setTouchedRef.current = setTouchedWrapper;

  const setErrorRef = useRef(setErrorWrapper);
  setErrorRef.current = setErrorWrapper;

  const validationMessagesRef = useRef(validationMessages);
  validationMessagesRef.current = validationMessages;

  const rulebookRef = useRef(rulebook);
  rulebookRef.current = rulebook;

  const messageFieldNameRef = useRef(messageFieldName);
  messageFieldNameRef.current = messageFieldName;

  const reconcile = useCallback(() => {
    if (!enabled) {
      return;
    }

    const root = formRootRef.current;

    if (!root) {
      return;
    }

    const entries = getEntries();

    for (const entry of entries) {
      const control = entry.element;

      if (!control.isConnected || !root.contains(control)) {
        continue;
      }

      const tagName = control.tagName.toLowerCase();

      if (tagName === 'input') {
        const inputType = (control.getAttribute('type') ?? 'text').toLowerCase();

        if (!textLikeInputTypes.has(inputType)) {
          continue;
        }
      } else if (tagName !== 'textarea') {
        continue;
      }

      if (control.disabled || control.readOnly) {
        continue;
      }

      const fieldName = control.getAttribute('name') ?? entry.name;

      if (!fieldName || touchedRef.current[fieldName]) {
        continue;
      }

      if (control.value.trim().length === 0) {
        continue;
      }

      setTouchedRef.current(fieldName, true);
      setErrorRef.current(
        fieldName,
        rulebookRef.current.getValidationMessage({
          fieldName,
          control,
          validationMessages: validationMessagesRef.current
        })
      );
    }

    if (!autoFocusMessage || !messageFieldNameRef.current) {
      return;
    }

    const activeElement = document.activeElement;
    const hasMeaningfulFocus =
      !!activeElement &&
      activeElement !== document.body &&
      activeElement !== document.documentElement;

    if (hasMeaningfulFocus) {
      return;
    }

    const messageControl = Array.from(root.querySelectorAll<HTMLTextAreaElement>('textarea[name]')).find(
      (control) => control.getAttribute('name') === messageFieldNameRef.current
    );

    if (!messageControl || !messageControl.isConnected || messageControl.disabled) {
      return;
    }

    try {
      messageControl.focus({ preventScroll: true });
    } catch {
      messageControl.focus();
    }
  }, [autoFocusMessage, enabled, formRootRef, getEntries]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let raf2: number | undefined;
    let timeout1: ReturnType<typeof setTimeout> | undefined;
    let timeout2: ReturnType<typeof setTimeout> | undefined;

    const raf1 = requestAnimationFrame(() => {
      reconcile();
      raf2 = requestAnimationFrame(reconcile);
      timeout1 = setTimeout(reconcile, 200);
      timeout2 = setTimeout(reconcile, 800);
    });

    return () => {
      cancelAnimationFrame(raf1);

      if (raf2 !== undefined) {
        cancelAnimationFrame(raf2);
      }

      if (timeout1 !== undefined) {
        clearTimeout(timeout1);
      }

      if (timeout2 !== undefined) {
        clearTimeout(timeout2);
      }
    };
  }, [enabled, reconcile]);
}
