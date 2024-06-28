import React from 'react';
import { Chip } from "@nextui-org/react";

type PriceChipsProps = {
  priceLabels: { [key: string]: string };
  house: {
    price_per_night: number;
    price_per_week: number;
    price_per_month: number;
  };
};

const PriceChips: React.FC<PriceChipsProps> = ({ priceLabels, house }) => (
  <div className="flex flex-row">
    {Object.entries(priceLabels).map(([period, key]) => (
      <Chip
        key={period}
        className="text-xl text-white font-inria mr-2"
        variant="shadow"
        classNames={{
          base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
          content: "drop-shadow shadow-black text-white"
        }}
      >
        ${house[key]} / {period.charAt(0).toUpperCase() + period.slice(1)}
      </Chip>
    ))}
  </div>
);

export default PriceChips;
