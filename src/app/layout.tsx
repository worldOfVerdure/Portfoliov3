import type { Metadata } from 'next';
import './globals.css';
import './utilities.css';

export const metadata: Metadata = {
  title: 'Small Business Next Template',
  description:
    'A fast Next.js + React + TypeScript + CSS Modules starter optimized for small business websites.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
