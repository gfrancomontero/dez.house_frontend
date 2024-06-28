import React from 'react';
import { motion } from 'framer-motion';
import HouseInfo from './HouseInfo';
import PriceChips from './PriceChips';
import LikeButton from './LikeButton';
import { Image } from "@nextui-org/react";
import MapOneHouse from '/src/components/layout/MapOneHouse.tsx';

type ExpandedCardProps = {
  house: {
    title: string;
    images: { url: string }[];
    general_address: string;
    price_per_night: number;
    address: any;
    available_from: string;
    available_until: string;
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
      <div className="border-1-pink p-4 h-full flex flex-col">
        {/* vitals  */}
        <div className="flex items-center gap-2">
          <Image alt="House" className="object-cover w-52" height={200} radius="lg" shadow="md" src={house.images[0].url} width="100%" />
          <div className="flex flex-col gap-2">
            <HouseInfo
              general_address={house.general_address}
              bedrooms={house.bedrooms}
              bathrooms={house.bathrooms}
              availability={`Available ${house.available_from} - ${house.available_until}`}
            />
            <PriceChips priceLabels={priceLabels} house={house} />
          </div>
          <div className="flex flex-grow justify-end">
            <LikeButton liked={liked} handleLikeToggle={handleLikeToggle} />
          </div>
        </div>
        {/* description */}
        <div className="mt-8 font-overpass">
          {house.description['en']}
        </div>
        {/* owner details */}
        <div className="mt-8 font-overpass">
          <h3 className="text-green">Rented by:</h3>
          <div className="mt-8 font-overpass">
            <div className="grid grid-cols-2 gap-4 w-fit"> 
              <div className="col-span-1">Name:</div>  
              <div className="col-span-1">{house.user.name}</div>
              <div className="col-span-1">Number:</div>
              <div className="col-span-1">{house.user.phone_number}</div>
              <div className="col-span-1">Email:</div>
              <div className="col-span-1">{house.user.email}</div>
            </div>
          </div>
        </div>
        {/* map */}
        <div className="mt-8 w-full flex flex-grow">
          <MapOneHouse lonlat={[house.address.longitude, house.address.latitude]} />
        </div>
      </div>
    </motion.div>
  );
};

export default ExpandedCard;
