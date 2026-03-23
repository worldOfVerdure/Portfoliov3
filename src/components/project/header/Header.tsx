"use client";

import { Link } from '../../primitives/Link';
import { Stack } from '../../primitives/Stack'
import styles from '../header/styles/header.module.css';
import { useEffect, useRef, useState } from 'react';

type HeaderLink = {
  linkText: string;
  linkHref: string;
};

type HeaderProps = {
  links: readonly HeaderLink[];
};

export const Header = ({links}: HeaderProps) => {
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('light');
  const [activeHref, setActiveHref] = useState<string>('#home');
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const sentinels = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-sentinel]'));

    if (!sentinels.length) {
      return;
    }

    const resolveNavState = () => {
      /* scrollY returns pixels we scroll from viewport top and .bottom returns the bottom position
       returns the number of pixels from the top of relative to the viewport. Given the fixed nature
       of Header, header.getBoundingClientRect().bottom equates to the Header's height. So by adding
       how much we scroll to the height, we are effectively calculating the threshold for sentinel's
       upper edge with the lower edge of the header. */
      const headerBottomInDocument = window.scrollY + header.getBoundingClientRect().bottom;
      let resolvedTheme: 'light' | 'dark' = 'light';
      let resolvedHref = '#home';

      for (const sentinel of sentinels) {
        const sentinelTopInDocument = window.scrollY + sentinel.getBoundingClientRect().top;
        const { navActive, navTheme } = sentinel.dataset;

        if (sentinelTopInDocument <= headerBottomInDocument) {
          if (navTheme === 'light' || navTheme === 'dark') {
            resolvedTheme = navTheme;
          }

          if (navActive) {
            resolvedHref = navActive;
          }
        }
      }

      setNavTheme((prevTheme) => (prevTheme === resolvedTheme ? prevTheme : resolvedTheme));
      setActiveHref((previousHref) => (previousHref === resolvedHref ? previousHref : resolvedHref));
    };

    let observer: IntersectionObserver | null = null;

    const bindObserver = () => {
      observer?.disconnect();

      const headerHeight = Math.ceil(header.getBoundingClientRect().height);

      observer = new IntersectionObserver(resolveNavState, {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0,
      });

      sentinels.forEach((sentinel) => {
        observer?.observe(sentinel);
      });
    };

    bindObserver();
    resolveNavState();

    window.addEventListener('resize', bindObserver);
    window.addEventListener('resize', resolveNavState);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', bindObserver);
      window.removeEventListener('resize', resolveNavState);
    };
  }, []);

  const navThemeClass = navTheme === 'light' ? styles.navLight : styles.navDark;

  return (
    <header ref={headerRef} className={`${styles.header} ${navThemeClass} full-width`} >
      <nav>
        <Stack
          as="ul"
          className={`${styles.linkStack} zero-margin`}
          direction="row"
          justify="center"
        >
          {links.map(({ linkText, linkHref }) => (
            <li key={linkText}>
              <Link
                aria-current={linkHref === activeHref ? 'location' : undefined}
                className={styles.links}
                href={linkHref}
              >
                {linkText}
              </Link>
            </li>
          ))}
        </Stack>
      </nav>
    </header>
  );
}
