'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import {
  EmailControl,
  Fieldset,
  FormActions,
  FormField,
  FormFieldHeader,
  FormLabel,
  FormLegend,
  FormMessage,
  FormRoot,
  TextControl,
  TextareaControl
} from '@/components/elevated/Form';
import { SectionHeading } from '../reuseables';
import { contactRulebook } from './rulebooks/contactRulebook';
import { gentleRulebook } from './rulebooks/gentleRulebook';
import styles from './styles/testForm.module.css';

const validationMessages = {
  name: {
    valueMissing: 'Please enter your name'
  },
  email: {
    valueMissing: 'Please enter your email',
    typeMismatch: 'Please enter a valid email address'
  },
  message: {
    valueMissing: 'Please enter a message',
    tooShort: 'Please write at least 10 characters'
  }
};

export const TestForm = () => {
  const [rulebookKey, setRulebookKey] = useState<'contact' | 'gentle'>('contact');
  const activeRulebook = rulebookKey === 'contact' ? contactRulebook : gentleRulebook;

  return (
    <>
      <SectionHeading>Forms</SectionHeading>
      <div className={styles.rulebookSwitcher}>
        <label className={styles.rulebookLabel} htmlFor="rulebook-select">
          Rulebook
        </label>
        <select
          className={styles.rulebookSelect}
          id="rulebook-select"
          value={rulebookKey}
          onChange={(event) => setRulebookKey(event.target.value as 'contact' | 'gentle')}
        >
          <option value="contact">Contact (focus + valid + invalid)</option>
          <option value="gentle">Gentle (idle + invalid only)</option>
        </select>
      </div>
      <FormRoot
        rulebook={activeRulebook}
        validationMessages={validationMessages}
        classes={{
          form: styles.form,
          fieldset: styles.fieldset,
          legend: styles.legend,
          field: styles.field,
          fieldHeader: styles.fieldHeader,
          label: styles.label,
          control: styles.control,
          textarea: styles.textarea,
          message: styles.message,
          actions: styles.actions
        }}
      >
        <Fieldset>
          <FormLegend>Message Me</FormLegend>

          <FormField name="name">
            <FormFieldHeader>
              <FormLabel fieldName="name">Name *</FormLabel>
              <FormMessage fieldName="name" />
            </FormFieldHeader>
            <TextControl name="name" required autoComplete="name" />
          </FormField>

          <FormField name="email">
            <FormFieldHeader>
              <FormLabel fieldName="email">Email *</FormLabel>
              <FormMessage fieldName="email" />
            </FormFieldHeader>
            <EmailControl name="email" required autoComplete="email" />
          </FormField>

          <FormField name="message">
            <FormFieldHeader>
              <FormLabel fieldName="message">Message *</FormLabel>
              <FormMessage fieldName="message" />
            </FormFieldHeader>
            <TextareaControl name="message" required minLength={10} />
          </FormField>
        </Fieldset>

        <FormActions>
          <Button className={styles.submit} type="submit" size="md">
            Send message
          </Button>
        </FormActions>
      </FormRoot>
    </>
  );
};
