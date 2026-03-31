
//components
import Image from 'next/image';
import { Link } from '@/components/primitives/Link/Link';
//styles
import styles from './styles/svgPlusLink.module.css';
//types
import type { LinkData } from './about-link-data/svgPlusLinkData';
 
export const SvgPlusLink = ({
  alt,
  linkHref,
  linkText,
  svgSrc,
  svgHeight,
  svgWidth
}: LinkData) => {
  return (
    <li>
      <Link
        classes={{ label: styles.linkLabel }}
        className={styles.link}
        href={linkHref}
      >
        <Image
          alt={alt}
          className={styles.socialLogo}
          height={svgHeight}
          src={svgSrc}
          unoptimized
          width={svgWidth}
        />
        <span className={styles.linkText}>{linkText}</span>
      </Link>
    </li>
  );
}
