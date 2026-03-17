"use client";

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Link } from '../../primitives/Link';
import { Stack } from '../../primitives/Stack';
import styles from './styles/Hero.module.css';

export const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={`${styles.heroContainer} full-width`} >
      <Stack className={styles.heroStack}>
        <div>
          <h1 className={`${styles.heroH1} text-center`}>
            Hello, I am <span className={styles.heroH1Name}>Andrew Chupka</span>
          </h1>
          <h2 className={`${styles.heroH2} text-center`}>I&apos;m a Fullstack Developer</h2>
        </div>
        <Link
          classes={{ label: styles.heroLinkLabel }}
          className={`${styles.heroLink} ${isMounted ? styles.heroLinkEntered : ''}`}
          href="#projects"
          size="lg"
          variant="buttonGhost"
        >
          View Work
          <ChevronDownIcon height={20} width={20} />
        </Link>
      </Stack>
    </section>
  );
}
