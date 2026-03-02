import { ContactForm } from "../../elevated/ContactForm";
import { SectionHeading } from "../reuseables";
import styles from "./styles/testContactForm.module.css";

export const TestContactForm = () => {
  return (
    <section className={styles.testContactSection}>
      <SectionHeading>Contact Form</SectionHeading>
      <ContactForm/>
    </section>
  );
}

/*
!zzz
 classes={{
          form: styles.testContactForm,
          fieldset: styles.testContactFieldset,
          legend: styles.testContactLegend,
          control: styles.testContactControl,
          textarea: styles.testContactTextarea
        }}

  This is one base form, use classes to style base.
  Can make additional bases.

*/
