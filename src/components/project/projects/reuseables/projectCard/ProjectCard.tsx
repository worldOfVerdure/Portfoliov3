"use client";

//Components
import Image from 'next/image';
import { Link } from '../../../../primitives/Link';
import { Stack } from '../../../../primitives/Stack';
//css
import styles from './styles/projectCard.module.css';
//hooks
import { useBreakpointBetween, useBreakpointUp } from '@/lib/useMediaQuery';
//types
import type { ProjectCardProps } from '../../projectsData/projectsData';

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
  const isTabletBand = useBreakpointBetween('sm', 'md', { initializeWithValue: false });
  const isTabletUp = useBreakpointUp('sm', { initializeWithValue: false });

  return (
    <>
      <h3 className={`${styles.projectsH3} full-width text-center`}>{projectTitle}</h3>
      {isTabletUp ?
      <Stack align="center" direction={isEven ? 'row' : 'row-reverse'} gap="var(--space-4)" >
        <div className={styles.projectImageContainer} >
          <Link className={styles.projectImageContainer} href={liveProject}>
            <Image
              alt={imgAlt}
              className={styles.projectImg}
              height={imgHeight}
              src={imgSrc}
              width={imgWidth}
            />
          </Link>
        </div>
        <Stack align="center" gap="var(--space-4)" >
          <p>{description}</p>
          <Stack direction="row" gap="var(--space-5)" >
            <Link
              href={liveProject}
              size={isTabletBand ? 'md' : 'lg'}
              variant="buttonPrimary"
            >
              Live Project
            </Link>
            <Link
              href={github}
              size={isTabletBand ? 'md' : 'lg'}
              variant="buttonSecondary"
            >
              GitHub
            </Link>
          </Stack>
        </Stack>
      </Stack>
       :
        <Stack align="center" gap="var(--space-4)" >
          <p>{description}</p>
          <Link className={styles.projectImageContainer} href={liveProject}>
            <Image
              alt={imgAlt}
              className={styles.projectImg}
              height={imgHeight}
              src={imgSrc}
              width={imgWidth}
            />
          </Link>
          <Stack direction="row" gap="var(--space-5)" >
            <Link
              href={liveProject}
              size={isTabletBand ? 'md' : 'lg'}
              variant="buttonPrimary"
            >
              Live Project
            </Link>
            <Link
              href={github}
              size={isTabletBand ? 'md' : 'lg'}
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
