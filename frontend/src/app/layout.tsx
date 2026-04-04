//Components
import { Footer } from '../components/project/footer/';
import { Header } from '../components/project/header/';
//Fonts
import { Noto_Sans, Work_Sans } from 'next/font/google';
//data
import { staticHeaderData } from '@/components/project/header/header-data/staticHeaderData';
// MetaData
import type { Metadata } from 'next';
//styles
import './globals.css';
import './utilities.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans'
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-work-sans'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
const SOCIAL_PREVIEW_IMAGE = `${SITE_URL}/social-preview.jpg`;

export const metadata: Metadata = {
  title: 'Andrew Chupka | Full-Stack Web Developer Portfolio',
  description: 'I am a fullstack developer who loves building responsive, performant websites. I have experience with React, Next.js, Express.js, and more. Get in touch!',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Andrew Chupka', url: SITE_URL }],
  openGraph: {
    title: 'Andrew Chupka | Full-Stack Web Developer Portfolio',
    description: 'I am a fullstack developer who loves building responsive, performant websites. I have experience with React, Next.js, Express.js, and more. Get in touch!',
    url: SITE_URL,
    siteName: 'Andrew Chupka | Full-Stack Web Developer Portfolio',
    type: 'website',
    images: [
      {
        url: SOCIAL_PREVIEW_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Andrew Chupka | Full-Stack Web Developer Portfolio hero preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Chupka | Full-Stack Web Developer Portfolio',
    description: 'I am a fullstack developer who loves building responsive, performant websites. I have experience with React, Next.js, Express.js, and more. Get in touch!',
    images: [SOCIAL_PREVIEW_IMAGE]
  },
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
        <Footer />
      </body>
    </html>
  );
}
