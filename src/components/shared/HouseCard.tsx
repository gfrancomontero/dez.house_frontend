"use client";

import React, { useState } from 'react';
import useLocalStorageManager from '/src/hooks/LocalStorageManager';
import ListCard from './HouseCardComponents/ListCard';
import ExpandedCard from './HouseCardComponents/ExpandedCard';
import { AnimatePresence } from 'framer-motion';

type House = {
  title: string;
  images: { url: string }[];
  general_address: string;
  price_per_night: number;
  price_per_week: number;
  price_per_month: number;
  bedrooms: number;
  bathrooms: number;
  id: number;
};

type HouseCardProps = {
  house: House;
};

const HouseCard = React.forwardRef<HTMLDivElement, HouseCardProps>(({ house }, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const { storedValue: likedHouses, addToLocalStorage, removeFromLocalStorage } = useLocalStorageManager<number>('likedHouses', []);
  const { storedValue: seenHouses, addToLocalStorage: addSeenHouse } = useLocalStorageManager<number>('seenHouses', []);
  
  const liked = likedHouses.includes(house.id);
  const seen = seenHouses.includes(house.id);

  const handleLikeToggle = () => {
    const message = liked ? 'Removed from likes.' : 'Added to likes.';
    liked ? removeFromLocalStorage(house.id, message) : addToLocalStorage(house.id, message);
  };

  const handleCardClick = () => {
    setIsClicked(true);
    if (!seen) setTimeout(() => {
      addSeenHouse(house.id, `Marked house ${house.id} as seen.`);
    }, 1000)
  };

  return (
    <>
      <ListCard house={house} setIsClicked={handleCardClick} liked={liked} seen={seen} handleLikeToggle={handleLikeToggle} />
      <AnimatePresence>
        {isClicked && <ExpandedCard house={house} setIsClicked={setIsClicked} liked={liked} handleLikeToggle={handleLikeToggle} />}
      </AnimatePresence>
    </>
  );
});

HouseCard.displayName = 'HouseCard';

export default HouseCard;
