// providers/FontProvider.tsx

import React, { ReactNode } from 'react';
import { Inria_Sans, Overpass_Mono } from '@next/font/google';

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const overpassMono = Overpass_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface FontProviderProps {
  children: ReactNode;
}

export default function FontProvider({ children }: FontProviderProps) {
  return (
    <div className={`${inriaSans.className} ${overpassMono.className}`}>
      {children}
    </div>
  );
}
