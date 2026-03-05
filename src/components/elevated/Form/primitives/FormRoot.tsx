'use client';

import * as Form from '@radix-ui/react-form';
import { useId, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import {
  FormStateContext,
  FormStateContextValue,
  FormThemeContext,
  FormThemeContextValue
} from '../context/formContext';
import { FormErrors, FormRootProps, FormTouchedFields } from '../helpers/types';

export function FormRoot({
  className,
  classes,
  tokens,
  style,
  rulebook,
  validationMessages,
  children,
  ...props
}: FormRootProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<FormTouchedFields>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const formId = useId().replace(/:/g, '');

  const stateValue = useMemo<FormStateContextValue>(
    () => ({
      formId,
      focusedField,
      touchedFields,
      errors,
      validationMessages,
      rulebook,
      setFocusedField,
      setFieldTouched: (fieldName, touched) => {
        setTouchedFields((previous) => ({
          ...previous,
          [fieldName]: touched
        }));
      },
      setFieldError: (fieldName, message) => {
        setErrors((previous) => ({
          ...previous,
          [fieldName]: message
        }));
      }
    }),
    [errors, focusedField, formId, touchedFields, validationMessages, rulebook]
  );

  const themeValue = useMemo<FormThemeContextValue>(() => ({ classes }), [classes]);

  return (
    <FormThemeContext value={themeValue}>
      <FormStateContext value={stateValue}>
        <Form.Root className={cn(classes?.form, className)} style={{ ...tokens, ...style }} {...props}>
          {children}
        </Form.Root>
      </FormStateContext>
    </FormThemeContext>
  );
}
