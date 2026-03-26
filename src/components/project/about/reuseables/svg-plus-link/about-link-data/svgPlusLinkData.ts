//images
import githubLogo from '@/assets/about-svg/github-logo.svg';
import linkedinLogo from '@/assets/about-svg/linkedin-logo.svg';
//types
import type { StaticImageData } from 'next/image';

export type LinkData = {
  alt: string;
  linkHref: string;
  linkText: string;
  svgSrc: string | StaticImageData;
  svgHeight: number;
  svgWidth: number;
};

export const codeLinkData: LinkData = {
  alt: 'SVG of the GitHub logo.',
  linkHref: 'https://github.com/worldOfVerdure?tab=repositories',
  linkText: 'GitHub',
  svgSrc: githubLogo,
  svgHeight: 40,
  svgWidth: 40
};

export const workLinkData: LinkData = {
  alt: 'SVG of the LinkedIn logo.',
  linkHref: 'https://www.linkedin.com/in/andrew-chupka/',
  linkText: 'LinkedIn',
  svgSrc: linkedinLogo,
  svgHeight: 40,
  svgWidth: 40
};
