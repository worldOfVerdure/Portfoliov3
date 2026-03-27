
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
        className={styles.link}
        classes={{ label: styles.linkLabel }}
        href={linkHref}
      >
        <Image alt={alt} height={svgHeight} src={svgSrc} width={svgWidth} />
        <span className={styles.linkText}>{linkText}</span>
      </Link>
    </li>
  );
}
