import { cn } from '@/lib/cn';
import { useFormState, useFormTheme } from '../context/formContext';
import { getMessageId } from '../helpers/ids';
import { useFieldMessage } from '../helpers/state';
import { FormMessageProps } from '../helpers/types';

export function FormMessage({ fieldName, className }: FormMessageProps) {
  const { classes } = useFormTheme();
  const { formId } = useFormState();
  const message = useFieldMessage(fieldName);

  return (
    <p className={cn(classes?.message, className)} aria-live="polite" id={getMessageId(formId, fieldName)}>
      {message}
    </p>
  );
}
