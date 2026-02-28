import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.hero} display-grid items-center`}>
        <p className={`${styles.eyebrow} zero-margin`}>Fast starter for small business websites</p>
        <h1 className={`${styles.title} zero-margin`}>Next.js, React, TypeScript, CSS Modules</h1>
        <p className={`${styles.subtitle} zero-margin`}>
          Tokenized styling defaults with import-time overrides. Keep your first load light and add only the
          dependencies each client project needs.
        </p>
        <div className={`${styles.actions} center-margin display-flex`}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button
            variant="ghost"
            vars={{ '--btn-border': 'var(--color-primary)', '--btn-color': 'var(--color-primary)' }}
          >
            Token override
          </Button>
        </div>
      </section>
    </main>
  );
}
