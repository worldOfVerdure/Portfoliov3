import { StaticImageData } from 'next/image';

export type ProjectCardProps = {
  projectTitle: string;
  imgSrc: StaticImageData;
  imgAlt: string;
  liveProject: `https://${string}`;
  github: `https://${string}`;
  description: string;
};

export const projectsData: ProjectCardProps[] = [
  {
    projectTitle: 'Simple Template',
    imgSrc: '#',
    imgAlt: 'A screenshot of the Simple Template project.',
    liveProject: 'https://liveproject1.com',
    github: 'https://github.com/user/project1',
    description: 'Description of Project 1'
  }
]
