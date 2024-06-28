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
  const [likedHouses, setLikedHouses] = useState(new Set<number>());

  useEffect(() => {
    try {
      const storedLikes = JSON.parse(localStorage.getItem('likedHouses') || '[]');
      setLikedHouses(new Set(storedLikes));
      setLiked(storedLikes.includes(house.id));
    } catch (error) {
      console.error("Failed to fetch liked houses from localStorage:", error);
    }
  }, [house.id]);

  const handleLikeToggle = () => {
    const updatedLikedHouses = new Set(likedHouses);
    if (liked) {
      updatedLikedHouses.delete(house.id);
    } else {
      updatedLikedHouses.add(house.id);
    }
    try {
      localStorage.setItem('likedHouses', JSON.stringify(Array.from(updatedLikedHouses)));
      setLikedHouses(updatedLikedHouses);
      setLiked(!liked);
    } catch (error) {
      console.error("Failed to update liked houses in localStorage:", error);
    }
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
