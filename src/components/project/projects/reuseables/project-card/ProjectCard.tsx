"use client";
//breakpoints
import { breakpoints } from '@/lib/breakpoints';
//components
import Image from 'next/image';
import { Link } from '@/components/primitives/Link/Link';
import { Stack } from '@/components/primitives/Stack/Stack';
//hooks
import { useBreakpointUp } from '@/lib/useMediaQuery';
//styles
import styles from './styles/projectCard.module.css';
//types
import type { ProjectCardProps } from '../../projects-data/projectsData';

export const ProjectCard = ({
  projectTitle,
  imgSrc,
  imgAlt,
  imgHeight,
  imgWidth,
  liveProject,
  github,
  description,
  isEven
}: ProjectCardProps) => {
  const isTabletUp = useBreakpointUp('md', { initializeWithValue: false });

  const sizes = `
    (max-width: ${breakpoints.md - 1}px) 80vw,
    (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg -1}px) min(40vw, 500px),
    min(40vw, 650px)`;
  return (
    <>
      {isTabletUp ?
        <Stack align="center" direction={isEven ? 'row' : 'row-reverse'} gap="0" >
          <Link className={styles.projectImageContainer} href={liveProject} unstyled>
            <Image
              alt={imgAlt}
              className={styles.projectImg}
              height={imgHeight}
              sizes={sizes}
              src={imgSrc}
              width={imgWidth}
            />
          </Link>
          <Stack align="center" className={styles.projectActionsContainer} gap="var(--space-4)" >
            <h3 className="full-width text-center">{projectTitle}</h3>
            <p className={`${styles.projectDescription}`}>{description}</p>
            <Stack direction="row" gap="var(--space-5)" >
              <Link
                className={`${styles.projectLinkLiveBtn} ${styles.projectLinkBtns}`}
                href={liveProject}
                size="lg"
                variant="buttonPrimary"
              >
                Live Project
              </Link>
              <Link
                className={`${styles.projectLinkGithubBtn} ${styles.projectLinkBtns}`}
                href={github}
                size="lg"
                variant="buttonSecondary"
              >
                GitHub
              </Link>
            </Stack>
          </Stack>
        </Stack>
       :
        <Stack align="center" gap="var(--space-4)" >
          <h3 className={`${styles.projectsH3} full-width text-center`}>{projectTitle}</h3>
          <p className={`${styles.projectDescription}`}>{description}</p>
          <Link className={styles.projectImageContainer} href={liveProject} unstyled>
            <Image
              alt={imgAlt}
              className={styles.projectImg}
              height={imgHeight}
              sizes={sizes}
              src={imgSrc}
              width={imgWidth}
            />
          </Link>
          <Stack direction="row" gap="var(--space-5)" >
            <Link
              className={`${styles.projectLinkLiveBtn} ${styles.projectLinkBtns}`}
              href={liveProject}
              size="lg"
              variant="buttonPrimary"
            >
              Live Project
            </Link>
            <Link
              className={`${styles.projectLinkGithubBtn} ${styles.projectLinkBtns}`}
              href={github}
              size="lg"
              variant="buttonSecondary"
            >
              GitHub
            </Link>
          </Stack>
        </Stack>
      }
    </>
  );
};
