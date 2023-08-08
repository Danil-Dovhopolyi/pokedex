import React from 'react';

interface CustomCardProps {
  name: string;
  imageUrl: string;
  types: string[];
  onClick: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  name,
  imageUrl,
  types,
  onClick,
}) => {
  return (
    <div
      className="bg-white border rounded-lg p-4 shadow-md cursor-pointer"
      onClick={onClick}
    >
      <img src={imageUrl} alt={name} className="w-24 h-24 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div>
        {types.map((type) => (
          <span
            key={type}
            className="inline-block bg-blue-500 text-white rounded-md px-2 py-1 mr-2 mb-2"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CustomCard;
