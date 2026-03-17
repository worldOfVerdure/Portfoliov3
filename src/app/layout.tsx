import type { Metadata } from 'next';
import './globals.css';
import './utilities.css';
import { Header } from '../components/project/header/';
import { staticHeaderData } from '@/components/project/header/headerData/staticHeaderData';

export const metadata: Metadata = {
  title: 'Small Business Next Template',
  description:
    'A fast Next.js + React + TypeScript + CSS Modules starter optimized for small business websites.'
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
