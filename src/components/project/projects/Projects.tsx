//components
import { Stack } from '../../primitives/Stack';
//css
import styles from './styles/projects.module.css';
//data
import { projectsData } from './projectsData/projectsData';
//types
import type { ProjectCardProps } from './projectsData/projectsData';
import { ProjectCard } from './reuseables/projectCard/ProjectCard';

export const Projects = () => {
  return (
    <section className={`${styles.projectsContainer} full-width`} id="projects">
      <span
        aria-hidden="true"
        className={styles.navSectionSentinel}
        data-nav-active="#projects"
        data-nav-theme="light"
        data-nav-sentinel
      />
      <h2 className="sectionH2">Projects</h2>
      <Stack as="ul" gap="var(--spacing-3)">
        {projectsData.map((project: ProjectCardProps) => (
          <li key={project.projectTitle} ><ProjectCard {...project} /></li>
        ))}
      </Stack>
    </section>
  );
}
