import { ComponentProps } from 'react';
import { cn } from '@/lib/cn';
import { useFormTheme } from '../context/formContext';

export function Fieldset({ className, ...props }: ComponentProps<'fieldset'>) {
  const { classes } = useFormTheme();

  return <fieldset className={cn(classes?.fieldset, className)} {...props} />;
}
