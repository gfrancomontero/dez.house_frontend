"use client";

import React, { useEffect, useState } from 'react';
import styles from './background.module.scss';
import Image from 'next/image';

const Background: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={styles.mainContainer}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      <Image
        alt="Miss Liberty"
        src='/images/miss_liberty.png'
        height={500}
        width={500}
        className={`absolute bottom-0 left-[2.5vw] h-[65vh] max-h-[50vw] w-auto opacity-80 ${styles.neonImage}`} 
      />
    </div>
  );
};

export default Background;
