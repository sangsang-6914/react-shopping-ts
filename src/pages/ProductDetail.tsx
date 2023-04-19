import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import useCarts from '../hooks/useCarts';

function ProductDetail() {
  const { state: product } = useLocation();
  const { title, description, price, options, category, image } = product;
  const [selected, setSelected] = useState<string>(options[0]);
  const [success, setSuccess] = useState<string | null>(null);
  const { addUpdateCart } = useCarts();
  const handleClick = () => {
    const updatedProduct = {
      ...product,
      quantity: 1,
      option: selected,
    };
    addUpdateCart.mutate(updatedProduct, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      },
    });
  };
  return (
    <>
      <p className="p-3 text-2xl text-gray-400 font-bold">{category}</p>
      <div className="flex flex-col md:flex-row">
        <div className="basis-7/12">
          <img className="w-full h-full" src={image} alt={title} />
        </div>
        <div className="basis-5/12 flex flex-col p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-xl font-bold border-b border-gray-400 py-2">
            ₩{price}
          </p>
          <p className="py-2">{description}</p>
          <div className="flex items-center my-5">
            <p className="text-brand font-bold">옵션: </p>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="outline-dashed border-brand flex-1 mx-2 p-1"
            >
              {options &&
                options.map((option: any) => (
                  <option value={option}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="font-bold my-2">{success}</p>}
          <Button onClick={handleClick} text="장바구니에 추가" />
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
