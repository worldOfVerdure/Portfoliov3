
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
    <li className={styles.liContainer} >
      <Link className={`${styles.link} flex full-width`} href={linkHref} >
        <Image alt={alt} height={svgHeight} src={svgSrc} width={svgWidth} />
        <p>{linkText}</p>
      </Link>
    </li>
  );
}
