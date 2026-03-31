import { cn } from '@/lib/cn';
import { useFormTheme } from '../context/formContext';
import { FormLegendProps } from '../helpers/types';

export function FormLegend({ className, ...props }: FormLegendProps) {
  const { classes } = useFormTheme();

  return <legend className={cn(classes?.legend, className)} {...props} />;
}
