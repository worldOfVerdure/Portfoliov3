'use client';
//components
import { ProjectCard } from './reuseables/project-card/ProjectCard';
import { Stack } from '@/components/primitives/Stack/Stack';
//data
import { projectsData } from './projects-data/projectsData';
//hooks
import { useEffect } from 'react';
//styles
import styles from './styles/projects.module.css';
//types
import type { ProjectCardProps } from './projects-data/projectsData';

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
    //*revealItem
    const revealItem = (item: HTMLElement) => {
      if (item.dataset.animated === 'true')
        return;

      item.dataset.animated = 'true';
      observer?.unobserve(item);
    };

    projectItems.forEach((item, index) => {
      item.dataset.animateReady = 'true';
      item.style.setProperty('--project-stagger', `${index * 90}ms`);
    });

    const hasPendingAnimations = () =>
      projectItems.some((item) => item.dataset.animated !== 'true');

    //*bindObserver
    const bindObserver = () => {
      observer?.disconnect();

      const headerHeight = resolveHeaderHeight();
      //*Constructor
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting)
              return;

            revealItem(entry.target as HTMLElement);
          });
        },
        {
          root: null,
          rootMargin: `-${headerHeight}px 0px -25% 0px`,
          threshold: .15,
        }
      );
      //*Observe items left to animate
      projectItems.forEach((item) => {
        if (item.dataset.animated !== 'true')
          observer?.observe(item);
      });
    };

    bindObserver();

    //*If resize occurs and there are pending animations, rebind the observer with the new header
    //*height while not replaying already played animations
    let resizeRafId = 0;

    const handleResize = () => {
      if (!hasPendingAnimations()) {
        return;
      }

      if (resizeRafId) {
        window.cancelAnimationFrame(resizeRafId);
      }

      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = 0;

        if (!hasPendingAnimations()) {
          return;
        }

        bindObserver();
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (resizeRafId) {
        window.cancelAnimationFrame(resizeRafId);
      }

      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, []);

  return (
    <section className="full-width sectionContainer" id="projects">
      <span
        aria-hidden="true"
        className="navSectionSentinel"
        data-nav-active="#projects"
        data-nav-theme="dark"
        data-nav-sentinel
      />
      <h2 className="sectionH2">Projects</h2>
      <Stack as="ul" className={styles.cardContainer}>
        {projectsData.map((project: ProjectCardProps, index: number) => (
          <li
            className={`${styles.cardAlignment} full-width`}
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
