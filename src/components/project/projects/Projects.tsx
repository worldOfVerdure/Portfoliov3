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
        data-nav-theme="dark"
        data-nav-sentinel
      />
      <h2 className="sectionH2">Projects</h2>
      <Stack as="ul" gap="var(--space-8)">
        {projectsData.map((project: ProjectCardProps, index: number) => (
          <li className={styles.cardAlignment} key={project.projectTitle}><ProjectCard {...project} isEven={index % 2 === 0} /></li>
        ))}
      </Stack>
    </section>
  );
}
