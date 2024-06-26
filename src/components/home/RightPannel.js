import React from 'react'
import LandingIndex from './rightPannelComponents/LandingIndex.tsx'
import Nav from '/src/components/shared/Nav.tsx'

const rightPannel = () => {
  return (
    <div className="flex w-full flex-col lg:overflow-y-scroll h-full relative lg:w-screen lg:h-screen lg:pl-[50vw] lg:fixed lg:top-0 lg:right-0 md:p-18 md:pl-4 sm:pr-14 sm:pt-14 pr-4 pt-4 items-end">
        <Nav />
        <LandingIndex />
    </div>
    )
  }
  
export default rightPannel