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
//patterns
import { namePattern } from './data/patterns';
//validation messages
import { validationMessages } from './data/validationMessages';
//styles
import formStyles from './styles/contactForm.module.css';
import styles from './styles/contact.module.css';

export const Contact = () => {
  return (
    <section className={`${styles.contactContainer} full-width sectionContainer`} id="contact">
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
        <FormActions>
          <Button
            classes={{ label: formStyles.submitLabel }}
            className={formStyles.submit}
            size="lg"
            variant="ghost"
          >
            Send Message
          </Button>
      </FormActions>
      </FormRoot>
    </section>
  );
}
