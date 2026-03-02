import { CustomStackContent } from '../reuseables/customStackContent/CustomStackContent';
import { Link } from '@/components/primitives/Link';
import { SectionHeading } from '@/components/test/reuseables/sectionHeading/SectionHeading';
import styles from './styles/customLinks.module.css';

export const CustomLinks = () => {
  return (
    <>
      <SectionHeading>Links</SectionHeading>
      <CustomStackContent >
        <Link
          className={styles.actionsContent}
          href="https://nextjs.org/docs"
          variant="buttonPrimary"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js
        </Link>
        <Link
          className={styles.actionsContent}
          href="https://react.dev"
          variant="buttonSecondary"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </Link>
        <Link
          className={styles.actionsContent}
          href="https://www.typescriptlang.org/docs/"
          variant="buttonGhost"
          vars={{ '--link-border': 'var(--color-primary)', '--link-color': 'var(--color-primary)' }}
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          TypeScript
        </Link>
        <Link
          className={styles.actionsContent}
          href="https://github.com/css-modules/css-modules"
          variant="text"
          size="lg"
          vars={{ '--link-color': 'var(--color-text)', '--link-decoration': 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          CSS
        </Link>
      </CustomStackContent>
    </>
  );
}
