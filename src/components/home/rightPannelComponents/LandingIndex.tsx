'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Chip } from '@nextui-org/react';
import SearchIcon from '/public/icons/svg/search.svg';
import HouseCard from '../../shared/HouseCard';
import { fetchHouses } from '../../../services/HouseService';
import Nav from '/src/components/layout/Nav.tsx';

type House = {
  title: any;
  images: any;
  general_address: string;
  price_per_night: number;
  price_per_week: number;
  price_per_month: number;
  id: number;
};

const LandingIndex: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const getHouses = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchHouses(page);
      if (page === 1) {
        setHouses(data); // Initial fetch replaces the state
      } else {
        setHouses((prevHouses) => [...prevHouses, ...data]);
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

  const loadMoreHouses = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getHouses(page);
  }, [page]);

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
      {loading && <p>Loading more houses...</p>}
    </div>
  );
};

export default LandingIndex;
