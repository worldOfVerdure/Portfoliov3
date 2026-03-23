//images
import animatedD3JSImg from '@/assets/projectThumbnail/animatedD3JS.webp';
import matchGameImg from '@/assets/projectThumbnail/matchGame.webp';
import simpleTemplateImg from '@/assets/projectThumbnail/simpleTemplate.webp';

//types
import type { StaticImageData } from 'next/image';

export type ProjectCardProps = {
  projectTitle: string;
  imgSrc: StaticImageData;
  imgAlt: string;
  imgHeight: number;
  imgWidth: number;
  liveProject: `https://${string}`;
  github: `https://${string}`;
  description: string;
  isEven?: boolean;
};

export const projectsData: ProjectCardProps[] = [
  {
    projectTitle: 'Simple Template',
    imgSrc: simpleTemplateImg,
    imgAlt: 'A thumbnail of the Simple Template project.',
    imgHeight: 4023,
    imgWidth: 7152,
    liveProject: 'https://simple-template-gamma.vercel.app/',
    github: 'https://github.com/worldOfVerdure/simpleTemplate',
    description: `A design-sytem and template I designed, inspired by MUI's primitives like
    Stack, Link and Button while using modular css to avoid JS style objects to minimize JS sent to
    the client. Radix UI provides headless logic and accessibility.`
  },
  {
    projectTitle: 'Animated D3.js Graph',
    imgSrc: animatedD3JSImg,
    imgAlt: 'A thumbnail of the Animated D3.js Graph project.',
    imgHeight: 3859,
    imgWidth: 6860,
    liveProject: 'https://animated-graph-simulation-d3.vercel.app/',
    github: 'https://github.com/worldOfVerdure/animatedGraphSimulationD3',
    description: `A graph node simulation inspired by my passion for graph theory. Built with D3.js
    and the HTML canvas element with responsiveness in mind by reducing the number of nodes based on
    viewport size.`
  },
  {
    projectTitle: 'Match Game',
    imgSrc: matchGameImg,
    imgAlt: 'A thumbnail of the Match Game project.',
    imgHeight: 4290,
    imgWidth: 7627,
    liveProject: 'https://worldofverdure.github.io/GameNMatch/',
    github: 'https://github.com/worldOfVerdure/GameNMatch',
    description: `An example of the traditional HTML, CSS, and JS panoply. This match game uses the
    setInterval and epoch time to manage the timer while rotate3d CSS function allows the cards to
    flip. The number of cards that appear on the screen are dependent on the viewport size.`
  }
];
