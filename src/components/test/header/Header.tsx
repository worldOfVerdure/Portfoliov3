import styles from './styles/header.module.css';

export const Header = () => {
  return (
    <header className={`${styles.header} flex flex-col`}>
      <h1 className={`${styles.title} zero-margin`}>Next.js, React, TypeScript, CSS Modules</h1>
      <p className={`${styles.eyebrow} zero-margin`}>Fast starter for small business websites</p>
      <p className={`${styles.subtitle} zero-margin`}>
        Tokenized styling defaults with usage-time overrides. Keep your first load light and add
        only the dependencies each client project needs.
      </p>
    </header>
  );
}
