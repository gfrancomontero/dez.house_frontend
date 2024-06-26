"use client";

import React from 'react';

type IndexCardProps = {
  house: {
    title: any;
    price_per_night: number;
    price_per_week: number;
    price_per_month: number;
    id: number;
  };
};

const IndexCard = React.forwardRef<HTMLDivElement, IndexCardProps>(({ house }, ref) => (
  <div ref={ref} className="card rb">
    {/* <h2>{house.title['en']}</h2> */}
    <h2>House id: {house.id}</h2>
    <p className="text-white">Nightly Price: {house.price_per_night}</p>
    <p className="text-white">Weekly Price: {house.price_per_week}</p>
    <p className="text-white">Monthly Price: {house.price_per_month}</p>
  </div>
));

IndexCard.displayName = 'IndexCard';

export default IndexCard;
