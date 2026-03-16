'use client';

import { Link } from '../../primitives/Link';
import { Stack } from '../../primitives/Stack'
import styles from '../header/styles/header.module.css';
import { useBreakpointDown } from '@/lib/useMediaQuery';

type HeaderLink = {
  linkText: string;
  linkHref: string;
};

type HeaderProps = {
  links: readonly HeaderLink[];
};

export const Header = ({links}: HeaderProps) => {
  const isPhoneOrSmaller = useBreakpointDown('xs', {
    initializeWithValue: false
  });
  return (
    <header className={`${styles.header} full-width`} >
      <nav>
        <Stack
          as="ul"
          className={`${styles.stack} no-bullets zero-margin zero-padding`}
          direction="row"
          justify="center"
        >
          {links.map(({ linkText, linkHref }) => (
            <li key={linkText}>
              <Link href={linkHref} size={isPhoneOrSmaller ? "md" : "compact-lg"}>{linkText}</Link>
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
