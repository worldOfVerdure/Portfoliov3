import { Link } from '@/components/primitives/Link';
import styles from './PrivacyPolicy.module.css';

const contactEmail = 'contact@andrewchupka.com';

export const PrivacyPolicy = () => {
  return (
    <section className={`sectionContainer ${styles.policySection}`}>
       <span
        aria-hidden="true"
        className={`${styles.navThemeSentinel} ${styles.navThemeSentinelDark}`}
        data-nav-theme="dark"
        data-nav-sentinel
      />
      <div className={styles.policyShell}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: Apr. 3, 2026</p>
          <p className={styles.lead}>
            This Privacy Policy explains how Andrew Chupka (&quot;I&quot;, &quot;me&quot;, &quot;my&quot;) collects,
            uses, and protects your personal information when you visit my website or interact
            with other services.
          </p>
          <p className={styles.lead}>
            I believe in transparency, simplicity, and respect for your privacy. If you have any
            questions, you can always reach me at{' '}
            <Link href={`mailto:${contactEmail}`} unstyled>
              {contactEmail}
            </Link>
            .
          </p>
        </header>

        <article className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Information I Collect</h2>

            <h3 className={styles.subheading}>Information collected automatically</h3>
            <p>
              My hosting provider, Vercel, automatically collects basic technical information when
              you visit the site, such as your IP address, browser type, device type, pages
              visited, and the date and time of access. This data helps keep the site secure and
              functioning properly.
            </p>
            <p>
              When you use my contact form, additional services may process limited data to operate
              and protect the form. I use Upstash (Redis/Ratelimit) for abuse prevention and rate
              limiting, which may process identifiers such as IP address and request metadata. I
              use Resend to deliver contact form emails, which processes the contact details and
              message content you submit. My site is built with Next.js, and server-side request
              handling may include standard operational logs needed for reliability, debugging, and
              security.
            </p>
            <p>
              The information you provide through the contact form, including your name, email
              address, and message, will only be used so Andrew Chupka can review your inquiry and
              respond directly.
            </p>

            <h3 className={styles.subheading}>Third-party services</h3>
            <p>
              If you interact with external links (GitHub, LinkedIn), those platforms may collect
              their own data according to their privacy policies. I do not receive or store that
              information.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. How I Use Your Information</h2>
            <p>I use your information only for:</p>
            <ul className={styles.list}>
              <li>Responding to your inquiries</li>
              <li>Improving the website&apos;s performance and security</li>
              <li>
                Keeping a record of our communications so I can respond and follow up as needed
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. How I Store and Protect Your Information</h2>
            <p>
              I take reasonable steps to protect your information, including secure encrypted
              connections (HTTPS), reputable hosting through Vercel, and limiting access to
              personal information to only what is necessary to respond to your inquiry. I retain
              contact form submissions only as long as needed to respond or maintain communication
              history.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Your Rights</h2>
            <p>
              You have the right to request a copy of the personal information I have about you,
              ask me to correct or update your information, or request deletion of your
              information. To exercise these rights, email me at{' '}
              <Link href={`mailto:${contactEmail}`} unstyled>
                {contactEmail}
              </Link>
              .
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Cookies</h2>
            <p>
              I do not use cookies for tracking or advertising. My hosting provider (Vercel) may
              use essential cookies or similar technologies required for security, performance, and
              site delivery. My contact form services (Upstash for rate limiting and Resend for
              email delivery) operate server-side and do not rely on advertising cookies on this
              website.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. External Links</h2>
            <p>
              My website contains links to third-party sites (GitHub, LinkedIn). I am not
              responsible for the privacy practices of those websites. I encourage you to review
              their privacy policies before interacting with them.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the
              top will reflect the most recent version.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Contact Me</h2>
            <p>
              If you have questions about this Privacy Policy or how your information is handled,
              you can reach me at{' '}
              <Link href={`mailto:${contactEmail}`} unstyled>
                {contactEmail}
              </Link>
              .
            </p>
          </section>
        </article>

        <div className={styles.returnHome}>
          <Link href="/" variant="text">
            Return to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
