import React from 'react';

const Intro: React.FC = () => {
  const visitorCount: string = '721';

  return (
    <>
      <h1 className="text-slate-200 lg:text-5xl md:text-4xl sm:text-2xl xs:text-lg lg:whitespace-nowrap">
        DEZ.HOUSE
      </h1>
      <h2 className="text-slate-300 w-full font-medium text-xl md:text-3xl mt-3">
        SUBLET AN APARTMENT
        <br />
        IN NEW YORK CITY
      </h2>
      <h4 className="mt-[5vh]">
        {visitorCount} people looked for
        <br />
        a sublet today
      </h4>
    </>
  );
};

export default Intro;
