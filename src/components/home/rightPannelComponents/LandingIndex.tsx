// src/components/LandingIndex.tsx
'use client'
import React, { useEffect, useRef } from 'react';
import HouseCard from '../../shared/HouseCard';
import Nav from '/src/components/layout/Nav.tsx';
import FilterModal from '/src/components/layout/FilterModal';
import { useSearch, SearchProvider } from '/src/context/SearchContext';

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
          <FilterModal />
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
