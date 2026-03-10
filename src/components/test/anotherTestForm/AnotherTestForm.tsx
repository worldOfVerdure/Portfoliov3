'use client';

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
  TelControl,
  TextControl,
  TextareaControl
} from '@/components/elevated/Form';
import { idleInvalidRule, invalidFocusValid } from '@/components/elevated/Form/rulebooks';
import { SectionHeading } from '../reuseables';
import styles from './styles/anotherTestForm.module.css';
import { useState } from 'react';

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

export const AnotherTestForm = () => {
  const [rulebookName, setRulebookName] = useState(invalidFocusValid.rulebookName);
  const activeRulebook =
    rulebookName === invalidFocusValid.rulebookName ? invalidFocusValid : idleInvalidRule;

  return (
    <>
      <SectionHeading>Another Form</SectionHeading>
      <div className={styles.rulebookSwitcher}>
        <label className={styles.rulebookLabel} htmlFor="rulebook-select">
          Rulebook
        </label>
        <select
          className={styles.rulebookSelect}
          id="rulebook-select"
          value={rulebookName}
          onChange={(event) => setRulebookName(event.target.value)}
        >
          <option value={invalidFocusValid.rulebookName}>Contact ({invalidFocusValid.rulebookName})</option>
          <option value={idleInvalidRule.rulebookName}>Idle Invalid ({idleInvalidRule.rulebookName})</option>
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

          <FormField name="tel">
            <FormFieldHeader>
              <FormLabel fieldName="tel">Phone</FormLabel>
              <FormMessage fieldName="tel" />
            </FormFieldHeader>
            <TelControl name="tel" autoComplete="tel" />
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

