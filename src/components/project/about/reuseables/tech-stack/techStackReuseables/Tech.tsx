//components
import Image from 'next/image';
import { Stack } from '@/components/primitives/Stack';
//styles
import styles from './styles/tech.module.css';
//types
import type { TechStackData } from '../tech-stack-data/techStackData';

export const Tech = ({ colEntires }: { colEntires: TechStackData[] }) => {
  return (
    <Stack className={styles.techContainer} gap="var(--space-4)" >
      {colEntires.map((tech: TechStackData) => (
        <Stack gap="none" key={tech.techText} >
          <Image
            alt={tech.svgAlt}
            className={styles.logo}
            height={tech.height}
            src={tech.svgSrc}
            unoptimized
            width={tech.width}
          />
          <p className={styles.techText}>{tech.techText}</p>
        </Stack>
      ))}
    </Stack>
  );
}
