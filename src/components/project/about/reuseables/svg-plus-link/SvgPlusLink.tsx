
//components
import Image from 'next/image';
import { Stack } from '@/components/primitives/stack/Stack';
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
      <Stack as="a" direction="row" gap="var(--space-1)" href={linkHref} >
        <Image alt={alt} height={svgHeight} src={svgSrc} width={svgWidth} />
        <p>{linkText}</p>
      </Stack>
    </li>
  );
}
