//Components
import { Header } from '../components/project/header/';
import { staticHeaderData } from '@/components/project/header/headerData/staticHeaderData';
//CSS
import './globals.css';
import './utilities.css';
//Fonts
import { Noto_Sans, Work_Sans } from 'next/font/google';
// MetaData
import type { Metadata } from 'next';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans'
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans'
});

export const metadata: Metadata = {
  title: 'Andrew Chupka Portfolio',
  description: 'I am a fullstack developer who loves building responsive, performant websites. I have experience with React, Next.js, Express.js, and more. Check out my projects and get in touch!',
  icons: {
  icon: [
  { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
  { url: '/favicon.svg', type: 'image/svg+xml' }
  ],
  shortcut: '/favicon.ico',
  apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${workSans.variable} ${notoSans.variable}`} lang="en-US">
      <body>
        <Header links={staticHeaderData} />
        {children}
      </body>
    </html>
  );
}
