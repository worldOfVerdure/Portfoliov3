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
  description
}: ProjectCardProps
) => {
  return (
    <Stack align="center" gap="var(--spacing-3)" >
      <h3>{projectTitle}</h3>
      <div className={styles.projectImageContainer} >
        <Image
          alt={imgAlt}
          className={styles.projectImg}
          height={imgHeight}
          src={imgSrc}
          width={imgWidth}
        />
      </div>
      <Stack direction="row" gap="var(--spacing-2)" >
        <Link href={liveProject} variant="buttonPrimary" >Live Project</Link>
        <Link href={github} variant="buttonSecondary" >GitHub</Link>
      </Stack>
      <p>{description}</p>
    </Stack>
  );
};
