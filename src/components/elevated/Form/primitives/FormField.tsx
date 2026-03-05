import * as Form from '@radix-ui/react-form';
import { cn } from '@/lib/cn';
import { useFormTheme } from '../context/formContext';
import { useFieldState } from '../helpers/state';
import { FormFieldProps } from '../helpers/types';

export function FormField({ className, name, children, ...props }: FormFieldProps) {
  const { classes } = useFormTheme();
  const fieldState = useFieldState(name);

  return (
    <Form.Field
      className={cn(classes?.field, className)}
      data-validation={fieldState}
      name={name}
      {...props}
    >
      {children}
    </Form.Field>
  );
}
