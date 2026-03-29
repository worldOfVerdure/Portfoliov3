//images
import css from '@/assets/techStack/css.svg';
import express from '@/assets/techStack/express.svg';
import git from '@/assets/techStack/git.svg';
import html from '@/assets/techStack/html.svg';
import mui from '@/assets/techStack/mui.svg';
import node from '@/assets/techStack/node.svg';
import postgre from '@/assets/techStack/postgre.svg';
import radix from '@/assets/techStack/radix.svg';
import react from '@/assets/techStack/react.svg';
import ts from '@/assets/techStack/ts.svg';
//types
import type { StaticImageData } from 'next/image';

export type TechStackData = {
  height: number;
  svgAlt: string;
  svgSrc: string | StaticImageData;
  techText: string;
  width: number;
}

export const techStackData: TechStackData[][] = [
  [
    {
      height: 128,
      svgAlt: "HTML's logo.",
      svgSrc: html,
      techText: "HTML",
      width: 128
    },
    {
      height: 128,
      svgAlt: "CSS' logo.",
      svgSrc: css,
      techText: "CSS",
      width: 128
    },
    {
      height: 128,
      svgAlt: "TypeScript's logo.",
      svgSrc: ts,
      techText: "TypeScript",
      width: 128
    }
  ],
  [
    {
      height: 128,
      svgAlt: "React's logo.",
      svgSrc: react,
      techText: "React",
      width: 128
    },
    {
      height: 128,
      svgAlt: "Material UI's logo.",
      svgSrc: mui,
      techText: "MUI",
      width: 148
    },
    {
      height: 2500,
      svgAlt: "Radix UI's logo.",
      svgSrc: radix,
      techText: "Radix",
      width: 2500
    },
    {
      height: 128,
      svgAlt: "Git's logo.",
      svgSrc: git,
      techText: "Git",
      width: 128
    }
  ],
  [ {
      height: 128,
      svgAlt: "Node's logo.",
      svgSrc: node,
      techText: "Node",
      width: 128
    },
    {
      height: 128,
      svgAlt: "Express.js's logo.",
      svgSrc: express,
      techText: "Express",
      width: 128
    },
    {
      height: 128,
      svgAlt: "Postgre's logo.",
      svgSrc: postgre,
      techText: "Postgre",
      width: 128
    }
  ]
];
