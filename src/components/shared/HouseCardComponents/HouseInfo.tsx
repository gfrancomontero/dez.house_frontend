import React from 'react';

type HouseInfoProps = {
  general_address: string;
  bedrooms: number;
  bathrooms: number;
  availability: string;
};

const HouseInfo: React.FC<HouseInfoProps> = ({ general_address, bedrooms, bathrooms, availability }) => (
  <div>
    <h3 className="text-3xl font-semibold text-pink font-overpass">{general_address}</h3>
    <h3 className="text-2xl text-pink font-inria">{bedrooms} Bedrooms, {bathrooms} Bath</h3>
    <p className="text-white text-xl font-inria">{availability}</p>
  </div>
);

export default HouseInfo;
