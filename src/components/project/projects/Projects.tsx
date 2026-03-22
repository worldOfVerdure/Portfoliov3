import { Stack } from '../../primitives/Stack';
import styles from './styles/projects.module.css';

export const Projects = () => {
  return (
    <section className={`${styles.projectsContainer} full-width`} id="projects">
      <h2 className="sectionH2">Projects</h2>
      <Stack gap="var(--spacing-3)">
        {/* Project Cards will go here */}
      </Stack>
    </section>
  );
}
