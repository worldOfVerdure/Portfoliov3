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

    const getSentinels = () => Array.from(document.querySelectorAll<HTMLElement>('[data-nav-sentinel]'));

    const resolveNavState = () => {
      const sentinels = getSentinels();

      if (!sentinels.length) {
        return;
      }

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
    let mutationObserver: MutationObserver | null = null;
    let frameId = 0;
    let lastScrollY = Number.NaN;
    let lastHeaderHeight = Number.NaN;

    const bindObserver = () => {
      observer?.disconnect();

      const sentinels = getSentinels();

      if (!sentinels.length) {
        return;
      }

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

    const rebindAndResolve = () => {
      bindObserver();
      resolveNavState();
    };

    const invalidateNavState = () => {
      lastScrollY = Number.NaN;
      lastHeaderHeight = Number.NaN;
    };

    const trackNavState = () => {
      const nextScrollY = window.scrollY;
      const nextHeaderHeight = Math.ceil(header.getBoundingClientRect().height);

      if (nextScrollY !== lastScrollY || nextHeaderHeight !== lastHeaderHeight) {
        const shouldRebind = nextHeaderHeight !== lastHeaderHeight;

        lastScrollY = nextScrollY;
        lastHeaderHeight = nextHeaderHeight;

        if (shouldRebind) {
          bindObserver();
        }

        resolveNavState();
      }

      frameId = window.requestAnimationFrame(trackNavState);
    };

    const handleResize = () => {
      invalidateNavState();
      rebindAndResolve();
    };

    const handlePageShow = () => {
      invalidateNavState();
    };

    const handlePopState = () => {
      invalidateNavState();
    };

    const handleHashChange = () => {
      invalidateNavState();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        invalidateNavState();
      }
    };

    invalidateNavState();
    rebindAndResolve();
    frameId = window.requestAnimationFrame(trackNavState);

    mutationObserver = new MutationObserver(() => {
      invalidateNavState();
      rebindAndResolve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
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
