'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import SearchIcon from '/public/icons/svg/search.svg';
import IndexCard from '/src/components/layout/IndexCard.tsx';
import { fetchHouses } from '/src/services/houseService';

const LandingIndex: React.FC = () => {
  const [houses, setHouses] = useState<{ title: string; price: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getHouses = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchHouses(page);
      if (page === 1) {
        setHouses(data); // Initial fetch replaces the state
      } else {
        setHouses(prevHouses => [...prevHouses, ...data]);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHouses(page);
  }, [page]);

  const lastHouseElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: containerRef.current,
          rootMargin: '0px',
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col h-full w-full justify-between items-end overflow-y-scroll" ref={containerRef}>
      <span className="text-pink flex flex-row items-center">
        REFINE SEARCH <SearchIcon className="ml-4" />
      </span>
      <div className="rb w-full h-full pt-4">
        {houses.map((house, index) => {
          if (index === houses.length - 5) {
            return <IndexCard key={index} house={house} ref={lastHouseElementRef} />;
          }
          return <IndexCard key={index} house={house} />;
        })}
      </div>
      {loading && <p>Loading more houses...</p>}
    </div>
  );
};

export default LandingIndex;
