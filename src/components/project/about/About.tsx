//components
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { SvgPlusLink } from './reuseables/svg-plus-link';
import { TechStack } from './reuseables/tech-stack';
//data
import { codeLinkData, workLinkData } from './reuseables/svg-plus-link';
//styles
import styles from './styles/about.module.css';

export const About = () => {
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
        <p className={`${styles.aboutMeText} text-center`} >
            I believe in the importance of learning during all phases of life. Web development
          excites me because technology and information is accessible to anyone with a computer and an internet
          connection. I am thankful that there is always more to learn and that learning immediately
          translates to an improved web experience for developers and clients. When I am away from
          the computer, I like to stay fit, be out in nature and spend time with my affectionate
          cat <span>&#x1F408;</span>.
        </p>
        <Stack className={styles.learnMoreContainer} >
          <Stack align="flex-start" >
            <h3>Learn More:</h3>
            <Stack className={styles.actionsContainer} >
              <p>About my web dev experience:</p>
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
            <p className={styles.aboutWorkCall}>About my work history:</p>
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
                  rel="noopener noreferrer"
                  target="_blank"
                  type="application/pdf"
                  variant="buttonSecondary"
                >
                  Download Resume
                </Link>
              </li>
            </Stack>
          </Stack>
        </Stack>
        <div>
          <h3 className={styles.techStackH3}>Tech Stack:</h3>
          <TechStack />
        </div>
        </Stack>
      </Stack>
    </section>
  );
}
