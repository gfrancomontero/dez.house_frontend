// layout.tsx

import React, { ReactNode } from 'react';
import './globals.scss';
import Background from '../components/layout/Background';

export const metadata = {
  title: 'DEZ.HOUSES',
  description: 'Rent Homes in New York',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="DEZ.HOUSES" />
        <meta property="og:description" content="Rent Homes in New York" />
        <meta property="og:image" content="https://dez.houses.vercel.app/logo.png" />
        <meta property="og:url" content="https://dez.houses.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DEZ.HOUSES" />
        <meta name="twitter:description" content="Rent Homes in New York" />
        <meta name="twitter:image" content="https://dez.houses.vercel.app/logo.png" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
}
