'use client';

import * as Form from '@radix-ui/react-form';
import { FocusEvent, InvalidEvent, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/cn';
import {
  ContactFormErrors,
  ContactFormFieldName,
  ContactFormProps,
  ContactFormSubmitEvent,
  ContactFormTouchedFields,
  ContactFormValues
} from './helpers/formTypes';
import {
  getFieldMessage,
  getFieldName,
  getFieldState,
  getValidationMessage,
  INITIAL_ERRORS,
  INITIAL_TOUCHED_FIELDS,
  isEmptyFieldValue
} from './helpers/utilityFormFunctions';
import styles from './ContactForm.module.css';
export type { ContactFormProps, ContactFormValues } from './helpers/formTypes';

export function ContactForm({
  className,
  classes,
  submitLabel = 'Send message',
  onSubmit
}: ContactFormProps) {
  const [focusedField, setFocusedField] = useState<ContactFormFieldName | null>(null);
  const [touchedFields, setTouchedFields] = useState<ContactFormTouchedFields>(INITIAL_TOUCHED_FIELDS);
  const [errors, setErrors] = useState<ContactFormErrors>(INITIAL_ERRORS);

  const updateFieldValidation = (control: HTMLInputElement | HTMLTextAreaElement) => {
    const fieldName = getFieldName(control.name);

    if (!fieldName) {
      return;
    }

    const nextMessage = getValidationMessage(fieldName, control);

    setErrors((previous) => ({
      ...previous,
      [fieldName]: nextMessage
    }));
  };

  const setFieldTouched = (fieldName: ContactFormFieldName) => {
    setTouchedFields((previous) => ({
      ...previous,
      [fieldName]: true
    }));
  };

  const handleFieldFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = getFieldName(event.currentTarget.name);

    if (!fieldName) {
      return;
    }

    setFocusedField(fieldName);
  };

  const handleFieldBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = getFieldName(event.currentTarget.name);

    if (!fieldName) {
      return;
    }

    setFocusedField((current) => (current === fieldName ? null : current));

    if (isEmptyFieldValue(event.currentTarget.value)) {
      setTouchedFields((previous) => ({
        ...previous,
        [fieldName]: false
      }));
      setErrors((previous) => ({
        ...previous,
        [fieldName]: null
      }));
      return;
    }

    setFieldTouched(fieldName);
    updateFieldValidation(event.currentTarget);
  };

  const handleFieldInvalid = (event: InvalidEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = getFieldName(event.currentTarget.name);

    if (!fieldName) {
      return;
    }

    setFieldTouched(fieldName);
    updateFieldValidation(event.currentTarget);
  };

  const handleSubmit = (event: ContactFormSubmitEvent) => {
    if (!onSubmit) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values: ContactFormValues = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? '')
    };

    onSubmit?.(values);
  };

  const nameFieldState = getFieldState('name', focusedField, touchedFields, errors);
  const emailFieldState = getFieldState('email', focusedField, touchedFields, errors);
  const messageFieldState = getFieldState('message', focusedField, touchedFields, errors);

  const nameFieldMessage = getFieldMessage('name', errors);
  const emailFieldMessage = getFieldMessage('email', errors);
  const messageFieldMessage = getFieldMessage('message', errors);

  return (
    <Form.Root
      className={cn(styles.form, classes?.form, className)}
      action="/submit-form"
      method="post"
      onSubmit={handleSubmit}
    >
      <fieldset className={cn(styles.fieldset, classes?.fieldset)}>
        <legend className={cn(styles.legend, classes?.legend)}>Message Me</legend>

        <Form.Field
          className={cn(styles.field, classes?.field)}
          name="name"
          data-validation={nameFieldState}
        >
          <div className={cn(styles.fieldHeader, classes?.fieldHeader)}>
            <Form.Label className={cn(styles.label, classes?.label)}>Name *</Form.Label>
            <p className={cn(styles.message, classes?.message)} aria-live="polite" id="contact-form-name-message">
              {nameFieldMessage}
            </p>
          </div>
          <Form.Control
            className={cn(styles.control, classes?.control)}
            data-validation={nameFieldState}
            name="name"
            required
            autoComplete="name"
            aria-describedby="contact-form-name-message"
            aria-invalid={nameFieldState === 'invalid' ? true : undefined}
            onFocus={handleFieldFocus}
            onBlur={handleFieldBlur}
            onInvalid={handleFieldInvalid}
          />
        </Form.Field>

        <Form.Field
          className={cn(styles.field, classes?.field)}
          name="email"
          data-validation={emailFieldState}
        >
          <div className={cn(styles.fieldHeader, classes?.fieldHeader)}>
            <Form.Label className={cn(styles.label, classes?.label)}>Email *</Form.Label>
            <p className={cn(styles.message, classes?.message)} aria-live="polite" id="contact-form-email-message">
              {emailFieldMessage}
            </p>
          </div>
          <Form.Control
            className={cn(styles.control, classes?.control)}
            data-validation={emailFieldState}
            type="email"
            name="email"
            required
            autoComplete="email"
            aria-describedby="contact-form-email-message"
            aria-invalid={emailFieldState === 'invalid' ? true : undefined}
            onFocus={handleFieldFocus}
            onBlur={handleFieldBlur}
            onInvalid={handleFieldInvalid}
          />
        </Form.Field>

        <Form.Field
          className={cn(styles.field, classes?.field)}
          name="message"
          data-validation={messageFieldState}
        >
          <div className={cn(styles.fieldHeader, classes?.fieldHeader)}>
            <Form.Label className={cn(styles.label, classes?.label)}>Message *</Form.Label>
            <p className={cn(styles.message, classes?.message)} aria-live="polite" id="contact-form-message-message">
              {messageFieldMessage}
            </p>
          </div>
          <Form.Control asChild>
            <textarea
              className={cn(styles.textarea, classes?.textarea)}
              data-validation={messageFieldState}
              name="message"
              required
              minLength={10}
              aria-describedby="contact-form-message-message"
              aria-invalid={messageFieldState === 'invalid' ? true : undefined}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
              onInvalid={handleFieldInvalid}
            />
          </Form.Control>
        </Form.Field>
      </fieldset>

      <div className={cn(styles.actions, classes?.actions)}>
        <Button className={cn(styles.submit, classes?.submit)} type="submit" size="md">
          {submitLabel}
        </Button>
      </div>
    </Form.Root>
  );
}
