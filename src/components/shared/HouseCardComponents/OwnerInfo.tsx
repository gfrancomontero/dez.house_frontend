import React from 'react';
import InfoList from './InfoList';

type User = {
  name: string;
  phone_number: string;
  email: string;
};

type OwnerDetailsProps = {
  user: User;
};

const OwnerDetails: React.FC<OwnerDetailsProps> = ({ user }) => {
  const ownerInfo = [
    { label: 'Name', value: user.name },
    { label: 'Number', value: user.phone_number },
    { label: 'Email', value: user.email },
  ];

  return (
    <div className="mt-8 font-overpass">
      <h3 className="text-green">Rented by:</h3>
      <div className="mt-8 font-overpass">
        <div className="grid grid-cols-2 gap-4 w-fit">
          {ownerInfo.map((item, index) => (
            <React.Fragment key={index}>
              <div className="col-span-1">{item.label}:</div>
              <div className="col-span-1">{item.value}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
