import { cn } from '@/lib/cn';
import { useFormTheme } from '../context/formContext';
import { FormFieldHeaderProps } from '../helpers/types';

export function FormFieldHeader({ className, children }: FormFieldHeaderProps) {
  const { classes } = useFormTheme();

  return <div className={cn(classes?.fieldHeader, className)}>{children}</div>;
}
