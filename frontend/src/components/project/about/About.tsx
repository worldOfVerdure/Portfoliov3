"use client";
//components
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { SvgPlusLink } from './reuseables/svg-plus-link';
import { TechStack } from './reuseables/tech-stack';
//data
import { codeLinkData, workLinkData } from './reuseables/svg-plus-link';
//hooks
import { useEffect } from 'react';
//styles
import styles from './styles/about.module.css';

export const About = () => {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header');
    const aboutItems = Array.from(
      document.querySelectorAll<HTMLElement>('#about [data-about-item]')
    );

    if (!header || !aboutItems.length) {
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

    aboutItems.forEach((item, index) => {
      item.dataset.animateReady = 'true';
      item.style.setProperty('--project-stagger', `${index * 90}ms`);
    });

    const hasPendingAnimations = () =>
      aboutItems.some((item) => item.dataset.animated !== 'true');

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
      aboutItems.forEach((item) => {
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
    <section className="full-width sectionContainer" id="about">
      <span
        aria-hidden="true"
        className="navSectionSentinel"
        data-nav-active="#about"
        data-nav-theme="dark"
        data-nav-sentinel
      />
      <h2 className="sectionH2">About Me</h2>
      <Stack>
        <p className={`${styles.aboutMeText} ${styles.aboutItemAnimation}`} data-about-item >
            I believe in the importance of learning during all phases of life. Web development
          excites me because technology and information is accessible to anyone with a computer and an internet
          connection. I am thankful that there is always more to learn and that learning immediately
          translates to an improved web experience for developers and clients. When I am away from
          the computer, I like to stay fit, be out in nature and spend time with my affectionate
          cat.
        </p>
        <Stack className={`${styles.learnMoreContainer} ${styles.aboutItemAnimation}`} data-about-item >
          <Stack align="flex-start" >
            <h3>Learn More:</h3>
            <Stack className={styles.actionsContainer} >
              <h4>About my web dev experience:</h4>
              <Stack
                as="ul"
                className={styles.webdevList}
                direction="row"
                gap="var(--space-5)"
              >
                <SvgPlusLink {...codeLinkData} />
            </Stack>
          </Stack>
          <Stack className={styles.actionsContainer} >
            <h4 className="full-width">About my work history:</h4>
            <Stack as="ul" direction="row" gap="var(--space-5)" >
              <SvgPlusLink {...workLinkData} />
              <li>
                <Link
                  classes={{ label: styles.resumeButtonLabel }}
                  className={styles.resumeBtn}
                  href="/andrew_chupka_resume.pdf"
                  prefetch={false}
                  download
                  size="sm"
                  type="application/pdf"
                  variant="buttonSecondary"
                >
                  Download Resume
                </Link>
              </li>
            </Stack>
          </Stack>
        </Stack>
        <div className={`${styles.aboutItemAnimation}`} data-about-item>
          <h3 className={styles.techStackH3}>Tech Stack:</h3>
          <TechStack />
        </div>
        </Stack>
      </Stack>
    </section>
  );
}
