import styles from './styles/sectionHeading.module.css';

export const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className={`${styles.sectionHeading} zero-margin`}>{children}</h2>;
};
