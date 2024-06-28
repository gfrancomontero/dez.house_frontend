"use client";

import React, { useState, useEffect } from 'react';
import ListCard from './HouseCardComponents/ListCard';
import ExpandedCard from './HouseCardComponents/ExpandedCard';
import { AnimatePresence } from 'framer-motion';

type HouseCardProps = {
  house: {
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
};

const HouseCard = React.forwardRef<HTMLDivElement, HouseCardProps>(({ house }, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedHouses = JSON.parse(localStorage.getItem('likedHouses') || '[]');
    setLiked(likedHouses.includes(house.id));
  }, [house.id]);

  const handleLikeToggle = () => {
    const likedHouses = JSON.parse(localStorage.getItem('likedHouses') || '[]');
    if (liked) {
      const updatedHouses = likedHouses.filter((id: number) => id !== house.id);
      localStorage.setItem('likedHouses', JSON.stringify(updatedHouses));
    } else {
      likedHouses.push(house.id);
      localStorage.setItem('likedHouses', JSON.stringify(likedHouses));
    }
    setLiked(!liked);
  };

  return (
    <>
      <ListCard house={house} setIsClicked={setIsClicked} liked={liked} handleLikeToggle={handleLikeToggle} />
      <AnimatePresence>
        {isClicked && <ExpandedCard house={house} setIsClicked={setIsClicked} liked={liked} handleLikeToggle={handleLikeToggle} />}
      </AnimatePresence>
    </>
  );
});

HouseCard.displayName = 'HouseCard';

export default HouseCard;
