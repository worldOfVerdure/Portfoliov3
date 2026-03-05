import * as Form from '@radix-ui/react-form';
import { cn } from '@/lib/cn';
import { useFormState, useFormTheme } from '../context/formContext';
import { getControlId } from '../helpers/ids';
import { FormLabelProps } from '../helpers/types';

export function FormLabel({ className, fieldName, ...props }: FormLabelProps) {
  const { classes } = useFormTheme();
  const { formId } = useFormState();

  return (
    <Form.Label
      className={cn(classes?.label, className)}
      htmlFor={getControlId(formId, fieldName)}
      {...props}
    />
  );
}
