//components
import { Link } from "@/components/primitives/Link";
import { Stack } from "@/components/primitives/Stack";
//images
import githubIcon from "@/assets/footer/github-dark.svg";
import linkedinIcon from "@/assets/footer/linkedin-dark.svg";
import mushroomAntler from "@/assets/footer/mushroom-antler.svg";
//styles
import styles from "./styles/footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer} >
      <Stack className={styles.missionPrivacyStack} gap="none" > {/* Footer mission & privacy */}
        <Stack align="flex-start" gap="var(--space-2)" > {/* Footer mission */}
          <h2 className={styles.footerH2} >Web Developer</h2>
          <Stack className={styles.author} direction="row" >
            <img
              alt="Mushroom with antlers. Site's logo."
              className={styles.footerLogo}
              loading="lazy"
              src={mushroomAntler.src}
            />
            <h3 className={styles.footerAuthorName} >Andrew Chupka</h3>
          </Stack>
          <em><p className={styles.footerMission} >Every website, engineered to be efficient and accessible.</p></em>
          <nav className={styles.footerLinks}>
            <Stack as="ul" direction="row" gap="var(--space-4)" >
            <li>
              <Link className={styles.footerLogoLinks} href="https://github.com/worldOfVerdure?tab=repositories" >
                <img
                  alt="GitHub icon that links to Andrew Chupka's GitHub repositories."
                  className={styles.footerLogo}
                  loading="lazy"
                  src={githubIcon.src}
                />
              </Link>
            </li>
            <li>
              <Link className={styles.footerLogoLinks} href="https://www.linkedin.com/in/andrew-chupka/" >
                <img
                  alt="LinkedIn icon that links to Andrew Chupka's LinkedIn profile."
                  className={styles.footerLogo}
                  loading="lazy"
                  src={linkedinIcon.src}
                />
              </Link>
            </li>
          </Stack>
          </nav>
          <small className={styles.footerDisclaimer} >© 2026 Andrew Chupka. All rights reserved.</small>
        </Stack>
        <div className={styles.privacyContainer} >
          <h2 className={styles.footerH2}>Privacy</h2>
          <nav className={styles.footerLinks}>
            <Link
              classes={{label: styles.linkText}}
              className={styles.linkText}
              href="/privacy-policy"
              variant="text"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </Stack>
    </footer>
  );
}
