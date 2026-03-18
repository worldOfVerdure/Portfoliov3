"use client";

import { useEffect, useRef, useState } from 'react';
import { Link } from '../../primitives/Link';
import { Stack } from '../../primitives/Stack'
import styles from '../header/styles/header.module.css';

type HeaderLink = {
  linkText: string;
  linkHref: string;
};

type HeaderProps = {
  links: readonly HeaderLink[];
};

export const Header = ({links}: HeaderProps) => {
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light');
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const sentinels = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme-sentinel][data-nav-theme]')
    );

    if (!sentinels.length) {
      return;
    }

    const resolveTheme = () => {
      const headerBottomInDocument = window.scrollY + header.getBoundingClientRect().bottom;
      let resolvedTheme: 'light' | 'dark' = 'light';

      for (const sentinel of sentinels) {
        const sentinelTopInDocument = window.scrollY + sentinel.getBoundingClientRect().top;
        const theme = sentinel.dataset.navTheme;

        if (sentinelTopInDocument <= headerBottomInDocument && (theme === 'light' || theme === 'dark')) {
          resolvedTheme = theme;
        }
      }

      setNavTheme((prevTheme) => (prevTheme === resolvedTheme ? prevTheme : resolvedTheme));
    };

    let observer: IntersectionObserver | null = null;

    const bindObserver = () => {
      observer?.disconnect();

      const headerHeight = Math.ceil(header.getBoundingClientRect().height);

      observer = new IntersectionObserver(resolveTheme, {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0,
      });

      sentinels.forEach((sentinel) => {
        observer?.observe(sentinel);
      });
    };

    bindObserver();
    resolveTheme();

    window.addEventListener('resize', bindObserver);
    window.addEventListener('resize', resolveTheme);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', bindObserver);
      window.removeEventListener('resize', resolveTheme);
    };
  }, []);

  const navThemeClass = navTheme === 'light' ? styles.navLight : styles.navDark;

  return (
    <header ref={headerRef} className={`${styles.header} ${navThemeClass} full-width`} >
      <nav>
        <Stack
          as="ul"
          className={`${styles.linkStack} no-bullets zero-margin zero-padding`}
          direction="row"
          justify="center"
        >
          {links.map(({ linkText, linkHref }) => (
            <li key={linkText}>
              <Link className={styles.links} href={linkHref} >{linkText}</Link>
            </li>
          ))}
        </Stack>
      </nav>
    </header>
  );
}
