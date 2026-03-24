'use client';
//components
import { ProjectCard } from './reuseables/projectCard/ProjectCard';
import { Stack } from '../../primitives/Stack';
//css
import styles from './styles/projects.module.css';
//data
import { projectsData } from './projectsData/projectsData';
//hooks
import { useEffect } from 'react';
//types
import type { ProjectCardProps } from './projectsData/projectsData';

export const Projects = () => {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header');
    const projectItems = Array.from(
      document.querySelectorAll<HTMLElement>('#projects [data-project-item]')
    );

    if (!header || !projectItems.length) {
      return;
    }

    const resolveHeaderHeight = () => Math.ceil(header.getBoundingClientRect().height);

    let observer: IntersectionObserver | null = null;

    const revealItem = (item: HTMLElement) => {
      if (item.dataset.animated === 'true') {
        return;
      }

      item.dataset.animated = 'true';
      observer?.unobserve(item);
    };

    projectItems.forEach((item, index) => {
      item.dataset.animateReady = 'true';
      item.style.setProperty('--project-stagger', `${index * 90}ms`);
    });

    const bindObserver = () => {
      observer?.disconnect();

      const headerHeight = resolveHeaderHeight();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            revealItem(entry.target as HTMLElement);
          });
        },
        {
          root: null,
          rootMargin: `-${headerHeight}px 0px 30% 0px`,
          threshold: 0,
        }
      );

      projectItems.forEach((item) => {
        if (item.dataset.animated !== 'true') {
          observer?.observe(item);
        }
      });
    };

    bindObserver();
    window.addEventListener('resize', bindObserver);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', bindObserver);
    };
  }, []);

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
      <Stack as="ul" className={styles.cardContainer}>
        {projectsData.map((project: ProjectCardProps, index: number) => (
          <li
            className={`${styles.cardAlignment} ${styles.liContainer}`}
            data-project-item
            key={project.projectTitle}
          >
            <ProjectCard {...project} isEven={index % 2 === 0} />
          </li>
        ))}
      </Stack>
    </section>
  );
}
