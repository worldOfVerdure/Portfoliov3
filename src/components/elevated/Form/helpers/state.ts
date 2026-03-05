import { useFormState } from '../context/formContext';

export const useFieldState = (fieldName: string) => {
  const { focusedField, touchedFields, errors, rulebook } = useFormState();

  return rulebook.getFieldState({
    fieldName,
    focusedField,
    touchedFields,
    errors
  });
};

export const useFieldMessage = (fieldName: string) => {
  const { errors, rulebook } = useFormState();

  return rulebook.getFieldMessage({
    fieldName,
    errors
  });
};
