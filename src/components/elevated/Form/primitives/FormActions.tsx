import { cn } from '@/lib/cn';
import { useFormTheme } from '../context/formContext';
import { FormActionsProps } from '../helpers/types';

export function FormActions({ className, ...props }: FormActionsProps) {
  const { classes } = useFormTheme();

  return <div className={cn(classes?.actions, className)} {...props} />;
}
