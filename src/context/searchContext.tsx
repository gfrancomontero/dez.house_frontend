// src/context/SearchContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchHouses } from '../services/houseService';

type House = {
  title: any;
  images: any;
  general_address: string;
  price_per_night: number;
  price_per_week: number;
  price_per_month: number;
  id: number;
};

type SearchContextType = {
  houses: House[];
  loading: boolean;
  error: string | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadMoreHouses: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const getHouses = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchHouses(page);
      if (page === 1) {
        setHouses(data);
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

  return (
    <SearchContext.Provider value={{ houses, loading, error, page, setPage, loadMoreHouses }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};