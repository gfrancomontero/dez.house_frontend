import React from 'react'
import Intro from './leftPannelComponents/Intro.tsx'

const leftPannel = () => {
  return (
    <div className="h-full z-20
    md:p-18 md:pr-4 sm:p-14 p-4
    lg:h-screen lg:fixed lg:top-0 lg:left-0">
        <Intro />
    </div>
  )
  }
  
export default leftPannel