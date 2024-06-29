"use client";

import React from 'react';
import styles from './listCard.module.scss';
import { Image } from "@nextui-org/react";
import HouseInfo from './HouseInfo';
import PriceChips from './PriceChips';
import LikeButton from './LikeButton';
import { Chip } from "@nextui-org/react";

type HouseCardProps = {
  house: {
    title: string;
    images: { url: string }[];
    general_address: string;
    available_from: string;
    available_until: string;
    price_per_night: number;
    price_per_week: number;
    price_per_month: number;
    bedrooms: number;
    bathrooms: number;
    id: number;
  };
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  seen: boolean;
  handleLikeToggle: () => void;
};

const ListCard = React.forwardRef<HTMLDivElement, HouseCardProps>(({ house, setIsClicked, liked, seen, handleLikeToggle }, ref) => {
  const priceLabels: { [key: string]: string } = {
    night: "price_per_night",
    week: "price_per_week",
    month: "price_per_month",
  };

  return (
    <div
      className={`bg-transparent w-[50vw] relative border-1-pink mb-4 rounded-2xl cursor-pointer ${styles.card}`}
      ref={ref}
      onClick={setIsClicked}
    >
      <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
        <div className="relative col-span-6 md:col-span-4 p-1">
          <Image
            alt="House"
            className="object-cover"
            height={200}
            radius="lg"
            shadow="md"
            src={house.images[0].url}
            width="100%"
          />
        </div>

        <div className="flex flex-col col-span-6 md:col-span-8 h-full">
          <div className="flex flex-col justify-between h-full items-start py-4">
            <div className="flex flex-col justify-between h-full">
              <HouseInfo
                general_address={house.general_address}
                bedrooms={house.bedrooms}
                bathrooms={house.bathrooms}
                availability={`Available ${house.available_from} - ${house.available_until}`}
              />
              <PriceChips priceLabels={priceLabels} house={house} />
            </div>
            <div className="absolute top-3 right-0 flex flex-row">
              {seen && <Chip color="warning">Seen</Chip>}
              <LikeButton liked={liked} handleLikeToggle={handleLikeToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ListCard.displayName = 'ListCard';

export default ListCard;
