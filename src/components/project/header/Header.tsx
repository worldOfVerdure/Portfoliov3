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
  return (
    <header className={`${styles.header} full-width`} >
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


/*
TODO: play with nav font-sizes and spacing
*/
