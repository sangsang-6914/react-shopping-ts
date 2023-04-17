import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductProps } from '../interface/product';

function ProductCard({
  product: { title, id, image, price, category },
  product,
}: IProductProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${id}`, { state: product });
  };
  return (
    <li
      onClick={handleClick}
      className="shadow-md flex flex-col cursor-pointer hover:scale-105 transition-all"
    >
      <img src={image} alt={title} />
      <div className="flex justify-between px-2 text-xl">
        <p>{title}</p>
        <p>₩{price}</p>
      </div>
      <p className="p-2 text-gray-400">{category}</p>
    </li>
  );
}

export default ProductCard;
