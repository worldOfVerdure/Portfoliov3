import styles from './styles/projects.module.css';

export const Projects = () => {
  return (
    <section className={`${styles.projectsContainer} full-width`} id="projects">
      <span
        aria-hidden="true"
        className={styles.navThemeSentinel}
        data-nav-theme="dark"
        data-nav-theme-sentinel
      />
    </section>
  );
}
