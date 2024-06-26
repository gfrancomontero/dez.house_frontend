import React from 'react'

import LeftPannel from '../components/home/LeftPannel.js'
import RightPannel from '../components/home/RightPannel.js'

export default function Home() {
  return (
    <main className="content flex h-lvh h-full w-full flex-col lg:flex-row items-center justify-between">
      <LeftPannel />
      <RightPannel />
    </main>
  );
}
