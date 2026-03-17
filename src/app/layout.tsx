import type { Metadata } from 'next';
import './globals.css';
import './utilities.css';
import { Header } from '../components/project/header/';
import { staticHeaderData } from '@/components/project/header/headerData/staticHeaderData';

export const metadata: Metadata = {
  title: 'Andrew Chupka Portfolio',
  description:
    'I am a fullstack developer who loves building responsive, performant websites. I have experience with React, Next.js, Express.js, and more. Check out my projects and get in touch!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <Header links={staticHeaderData} />
        {children}
      </body>
    </html>
  );
}
