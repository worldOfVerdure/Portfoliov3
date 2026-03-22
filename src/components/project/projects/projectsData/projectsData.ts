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
};

export const projectsData: ProjectCardProps[] = [
  {
    projectTitle: 'Simple Template',
    imgSrc: simpleTemplateImg,
    imgAlt: 'A thumbnail of the Simple Template project.',
    imgHeight: 936,
    imgWidth: 1423,
    liveProject: 'https://simple-template-gamma.vercel.app/',
    github: 'https://github.com/worldOfVerdure/simpleTemplate',
    description: 'Description of Project 1'
  },
  {
    projectTitle: 'Animated D3.js Graph',
    imgSrc: animatedD3JSImg,
    imgAlt: 'A thumbnail of the Animated D3.js Graph project.',
    imgHeight: 794,
    imgWidth: 1136,
    liveProject: 'https://animated-graph-simulation-d3.vercel.app/',
    github: 'https://github.com/worldOfVerdure/animatedGraphSimulationD3',
    description: 'Description of Project 2'
  },
  {
    projectTitle: 'Match Game',
    imgSrc: matchGameImg,
    imgAlt: 'A thumbnail of the Match Game project.',
    imgHeight: 926,
    imgWidth: 1877,
    liveProject: 'https://worldofverdure.github.io/GameNMatch/',
    github: 'https://github.com/worldOfVerdure/GameNMatch',
    description: 'Description of Project 3'
  }
];
