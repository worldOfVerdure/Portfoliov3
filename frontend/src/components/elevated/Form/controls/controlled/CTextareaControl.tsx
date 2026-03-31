import * as Form from '@radix-ui/react-form';
import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useFormState, useFormTheme } from '../../context/formContext';
import { composeHandlers } from '../../helpers/composeHandlers';
import { getControlId, getMessageId } from '../../helpers/ids';
import { useValidationFlowStatus } from '../../helpers/state';
import { SharedControlProps } from '../../helpers/types';
import { useControlValidationHandlers } from './useControlValidationHandlers';

export type CTextareaControlProps =
  Omit<ComponentPropsWithoutRef<'textarea'>, 'onFocus' | 'onBlur' | 'onInvalid' | 'onChange'> &
  SharedControlProps & {
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };

export function CTextareaControl({
  className,
  name,
  onFocus,
  onBlur,
  onChange,
  onInvalid,
  'aria-describedby': ariaDescribedBy,
  id,
  ...props
}: CTextareaControlProps) {
  const { classes } = useFormTheme();
  const { formId, errors } = useFormState();
  const fieldState = useValidationFlowStatus(name);
  const handlers = useControlValidationHandlers(name);
  const messageId = getMessageId(formId, name);

  return (
    <Form.Control asChild>
      <textarea
        {...props}
        id={id ?? getControlId(formId, name)}
        className={cn(classes?.textarea, classes?.control, className)}
        data-validation={fieldState}
        name={name}
        aria-describedby={ariaDescribedBy ?? messageId}
        aria-invalid={errors[name] ? true : undefined}
        onFocus={composeHandlers(handlers.onFocus, onFocus)}
        onBlur={composeHandlers(handlers.onBlur, onBlur)}
        onChange={composeHandlers(handlers.onChange, onChange)}
        onInvalid={composeHandlers(handlers.onInvalid, onInvalid)}
      />
    </Form.Control>
  );
}
