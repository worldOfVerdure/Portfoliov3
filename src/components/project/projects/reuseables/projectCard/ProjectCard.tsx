//Components
import Image from 'next/image';
import { Link } from '../../../../primitives/Link';
import { Stack } from '../../../../primitives/Stack';
//css
import styles from './styles/projectCard.module.css';
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
  return (
    <>
      <h3 className={`${styles.projectsH3} full-width text-center`}>{projectTitle}</h3>
      <div className={`${styles.cardBody} ${!isEven ? styles.cardBodyReversed : ''}`}>
        <Link className={styles.projectImageLink} href={liveProject}>
          <span className={styles.projectImageFrame}>
            <Image
              alt={imgAlt}
              className={styles.projectImg}
              height={imgHeight}
              src={imgSrc}
              width={imgWidth}
            />
          </span>
        </Link>
        <Stack align="center" className={styles.projectContent} gap="var(--space-4)">
          <p className={styles.projectDescription}>{description}</p>
          <Stack className={styles.projectActions} direction="row" gap="var(--space-5)" justify="center" wrap="wrap">
            <Link
              className={styles.projectActionLink}
              href={liveProject}
              size="lg"
              variant="buttonPrimary"
            >
              Live Project
            </Link>
            <Link
              className={styles.projectActionLink}
              href={github}
              size="lg"
              variant="buttonSecondary"
            >
              GitHub
            </Link>
          </Stack>
        </Stack>
      </div>
    </>
  );
};
