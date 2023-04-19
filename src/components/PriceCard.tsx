interface IPriceCardProps {
  text: string;
  price: number;
}

function PriceCard({ text, price }: IPriceCardProps) {
  return (
    <div className="bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl">
      <p>{text}</p>
      <p className="font-bold text-brand text-xl">{price}</p>
    </div>
  );
}

export default PriceCard;
