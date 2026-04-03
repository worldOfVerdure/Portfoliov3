'use client';

//components
import { Button } from '@/components/primitives/Button';
import { RedAsterisk } from './reuseables/red-asterisk';
//form components & rulebook
import {
  EmailControl,
  Fieldset,
  FormActions,
  FormField,
  FormFieldHeader,
  FormLabel,
  FormMessage,
  FormRoot,
  TextControl,
  TextareaControl,
  invalidFocusValid
} from '../../elevated/Form';
import { Stack } from '@/components/primitives/Stack';
//handler
import { type SubmitEventHandler, useState } from 'react';
//patterns
import { namePattern } from './form-data/patterns';
//validation messages
import { validationMessages } from './form-data/validationMessages';
//styles
import formStyles from './styles/contactForm.module.css';
import styles from './styles/contact.module.css';

type SubmitState = {
  status: 'success' | 'error';
  message: string;
};

type ContactFormSubmitHandler = SubmitEventHandler<HTMLFormElement>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState | null>(null);

  const handleSubmit: ContactFormSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim()
    };

    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;

      if (!response.ok) {
        setSubmitState({
          status: 'error',
          message: data?.error ?? 'Failed to send message. Please try again.'
        });
        return;
      }

      setSubmitState({
        status: 'success',
        message: data?.message ?? 'Message sent successfully.'
      });
      form.reset();
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`${styles.contactContainer} full-width sectionContainer zero-margin`} id="contact">
       <span
         aria-hidden="true"
         className="navSectionSentinel"
         data-nav-active="#contact"
         data-nav-theme="dark"
         data-nav-sentinel
      />
      <h2 className="sectionH2">Contact Me</h2>
      
      <FormRoot
        classes={{
          form: formStyles.form,
          fieldset: formStyles.fieldset,
          field: formStyles.field,
          fieldHeader: formStyles.fieldHeader,
          label: formStyles.label,
          control: formStyles.control,
          textarea: formStyles.textarea,
          message: formStyles.message,
          actions: formStyles.actions
        }}
        onSubmit={handleSubmit}
        rulebook={invalidFocusValid}
        validationMessages={validationMessages}
      >
        <Fieldset>
          <FormField name="name">
            <FormFieldHeader>
              <FormLabel fieldName="name">Name <RedAsterisk /></FormLabel>
              <FormMessage fieldName="name" />
            </FormFieldHeader>
            <TextControl autoComplete="name" name="name" pattern={namePattern} required />
          </FormField>

          <FormField name="email">
            <FormFieldHeader>
              <FormLabel fieldName="email">Email <RedAsterisk /></FormLabel>
              <FormMessage fieldName="email" />
            </FormFieldHeader>
            <EmailControl autoComplete="email" name="email" required />
          </FormField>

          <FormField name="message">
            <FormFieldHeader>
              <FormLabel fieldName="message">Message <RedAsterisk /></FormLabel>
              <FormMessage fieldName="message" />
            </FormFieldHeader>
            <TextareaControl minLength={10} name="message" required />
          </FormField>
        </Fieldset>
        <Stack align="flex-end" gap="none" >
          <div className={formStyles.submitMessageSlot}>
            <p
              aria-live="polite"
              className={formStyles.submitMessage}
              role="status"
              style={{
                color:
                  submitState?.status === 'success'
                    ? 'var(--color-success)'
                    : 'var(--color-error)',
              }}
            >
              {submitState?.message ?? ''}
            </p>
          </div>
          
          <FormActions>
            <Button
              classes={{ label: formStyles.submitLabel }}
              className={formStyles.submit}
              disabled={isSubmitting}
              size="lg"
              type="submit"
              variant="primary"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </FormActions>
        </Stack>
      </FormRoot>
    </section>
  );
}
