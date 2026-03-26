
//components
import Image from 'next/image';
import { Stack } from '@/components/primitives/stack';
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
      <Stack as="a" direction="row" href={linkHref} >
        <Image alt={alt} height={svgHeight} src={svgSrc} width={svgWidth} />
        <p>{linkText}</p>
      </Stack>
    </li>
  );
}
