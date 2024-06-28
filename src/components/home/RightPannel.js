import React from 'react'
import LandingIndex from './rightPannelComponents/LandingIndex.tsx'

const rightPannel = () => {
  return (
    <div className="flex w-full flex-col lg:overflow-y-scroll h-full relative lg:w-screen lg:h-screen lg:pl-[50vw] lg:fixed lg:top-0 lg:right-0 items-end">
        <LandingIndex />
    </div>
    )
  }
  
export default rightPannel