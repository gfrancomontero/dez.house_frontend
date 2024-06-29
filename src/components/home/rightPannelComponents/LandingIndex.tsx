// src/components/LandingIndex.tsx
'use client'
import React, { useEffect, useRef } from 'react';
import { Chip } from '@nextui-org/react';
import SearchIcon from '/public/icons/svg/search.svg';
import HouseCard from '../../shared/HouseCard';
import Nav from '/src/components/layout/Nav.tsx';
import { useSearch, SearchProvider } from '/src/context/SearchContext.tsx';

const LandingIndex: React.FC = () => {
  const { houses, loading, error, loadMoreHouses } = useSearch();
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreHouses();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col h-full w-full justify-between items-end">
      <div className="w-full h-full overflow-y-scroll pt-52 mr-8">
        <div className="fixed right-0 pr-8 top-0 pt-8 w-[100vw] pb-4 flex flex-col flex-end backdrop-blur-lg z-20">
          <Nav />
          <Chip
            classNames={{
              base: "bg-[#6969ff] border-small border-white/50 shadow-pink-500/30 p-4 pr-2",
              content: "drop-shadow shadow-black text-white"
            }}
          >
            <div className="flex flex-row align mt-1">
              ADVANCED SEARCH <SearchIcon className="ml-2" />
            </div>
          </Chip>
        </div>
        {houses.map((house, index) => (
          <HouseCard key={index} house={house} />
        ))}
        <div className="flex justify-center mt-4">
          <button 
            ref={loadMoreButtonRef}
            className="font-inria text-pink"
            onClick={loadMoreHouses}
            disabled={loading}
          >
            Loading...
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingIndexWrapper: React.FC = () => (
  <SearchProvider>
    <LandingIndex />
  </SearchProvider>
);

export default LandingIndexWrapper;
