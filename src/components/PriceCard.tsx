import React from 'react';

interface IPriceCardProps {
  text: string;
  price: number;
}

function PriceCard({ text, price }: IPriceCardProps) {
  return (
    <div className="p-5 flex flex-col items-center justify-center bg-gray-100">
      <p>{text}</p>
      <p className="text-brand font-bold">₩{price}</p>
    </div>
  );
}

export default PriceCard;
