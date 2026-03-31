import { useFormState } from '../context/formContext';

export const useValidationFlowStatus = (fieldName: string) => {
  const { focusedField, touchedFields, errors, rulebook } = useFormState();

  return rulebook.getValidationFlowStatus({
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

/*
*The three files that call useValidationFlowStatus are: FormField.tsx, BaseInputControl.tsx and
*TextareaControl.tsx. The flow status is a string: 'idle', 'focus', 'valid' or 'invalid'. The
*rulebook determines how to calculate the status based on some combination of form state such as:
*fieldname, focusedField, touchedFields, errors or etc.


?Only one file calls useFieldMessage: FormMessage.tsx. Despite many possible error messages for a
?field, the getFieldMessage function in the rulebook determines which message to show based on the
?current form state (e.g., if a message was ever answered in the first place vs the message was too
?short).
*/
