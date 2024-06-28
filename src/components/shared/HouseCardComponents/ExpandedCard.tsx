import React from 'react';
import { motion } from 'framer-motion';
import HouseInfo from './HouseInfo';
import PriceChips from './PriceChips';
import LikeButton from './LikeButton';
import { Image } from "@nextui-org/react";

type ExpandedCardProps = {
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
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  handleLikeToggle: () => void;
};

const ExpandedCard: React.FC<ExpandedCardProps> = ({ house, setIsClicked, liked, handleLikeToggle }) => {
  const priceLabels: { [key: string]: string } = {
    night: "price_per_night",
    week: "price_per_week",
    month: "price_per_month",
  };

  return (
    <motion.div 
      onClick={() => setIsClicked(false)} 
      className="w-[100vw] pl-[40vw] h-full fixed top-0 right-0 z-50 p-8 backdrop-blur-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-1-pink p-4 h-full">
        <div className="flex flex-grow items-center gap-2">
        <Image
            alt="House"
            className="object-cover w-52"
            height={200}
            radius="lg"
            shadow="md"
            src={house.images[0].url}
            width="100%"
          />
          <div className="flex flex-col h-full gap-2">
            <HouseInfo
              general_address={house.general_address}
              bedrooms={house.bedrooms}
              bathrooms={house.bathrooms}
              availability="Available on August 12th, for 17 nights"
            />
            <PriceChips priceLabels={priceLabels} house={house} />
          </div>
          <div className="flex flex-grow justify-end">
            <LikeButton liked={liked} handleLikeToggle={handleLikeToggle} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpandedCard;
