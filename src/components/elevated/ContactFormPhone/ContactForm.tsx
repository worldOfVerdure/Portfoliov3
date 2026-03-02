'use client';

import * as Form from '@radix-ui/react-form';
import { ComponentProps } from 'react';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/lib/cn';
import styles from './ContactForm.module.css';

type ContactFormSubmitEvent = Parameters<NonNullable<ComponentProps<typeof Form.Root>['onSubmit']>>[0];

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

type ContactFormSlots = {
  form?: string;
  fieldset?: string;
  legend?: string;
  field?: string;
  label?: string;
  control?: string;
  textarea?: string;
  message?: string;
  actions?: string;
  submit?: string;
};

export type ContactFormProps = {
  className?: string;
  classes?: ContactFormSlots;
  submitLabel?: string;
  onSubmit?: (values: ContactFormValues) => void;
};

export function ContactForm({
  className,
  classes,
  submitLabel = 'Send message',
  onSubmit
}: ContactFormProps) {
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

  return (
    <Form.Root
      className={cn(styles.form, classes?.form, className)}
      action="/submit-form"
      method="post"
      onSubmit={handleSubmit}
    >
      <fieldset className={cn(styles.fieldset, classes?.fieldset)}>
        <legend className={cn(styles.legend, classes?.legend)}>Message Me</legend>

        <Form.Field className={cn(styles.field, classes?.field)} name="name">
          <Form.Label className={cn(styles.label, classes?.label)}>Name</Form.Label>
          <Form.Control
            className={cn(styles.control, classes?.control)}
            type="text"
            name="name"
            required
            autoComplete="name"
          />
          <Form.Message className={cn(styles.message, classes?.message)} match="valueMissing">
            Please enter your name
          </Form.Message>
        </Form.Field>

        <Form.Field className={cn(styles.field, classes?.field)} name="email">
          <Form.Label className={cn(styles.label, classes?.label)}>Email</Form.Label>
          <Form.Control
            className={cn(styles.control, classes?.control)}
            type="email"
            name="email"
            required
            autoComplete="email"
          />
          <Form.Message className={cn(styles.message, classes?.message)} match="valueMissing">
            Please enter your email.
          </Form.Message>
          <Form.Message className={cn(styles.message, classes?.message)} match="typeMismatch">
            Please enter a valid email address
          </Form.Message>
        </Form.Field>

        <Form.Field className={cn(styles.field, classes?.field)} name="message">
          <Form.Label className={cn(styles.label, classes?.label)}>Message</Form.Label>
          <Form.Control asChild>
            <textarea
              className={cn(styles.textarea, classes?.textarea)}
              name="message"
              required
              minLength={10}
            />
          </Form.Control>
          <Form.Message className={cn(styles.message, classes?.message)} match="valueMissing">
            Please enter a message
          </Form.Message>
          <Form.Message className={cn(styles.message, classes?.message)} match="tooShort">
            Please write at least 10 characters
          </Form.Message>
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
