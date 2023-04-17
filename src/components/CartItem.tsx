import React from 'react';
import { IProductProps } from '../interface/product';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { HiTrash } from 'react-icons/hi';
import { addOrUpdateCart, removeFromCart } from '../api/firebase';
import { useAuth } from '../context/AuthContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CartItem({
  product: { image, title, price, option, quantity },
  product,
}: IProductProps) {
  const { user } = useAuth();
  const client = useQueryClient();
  const addUpdateCart = useMutation(
    (product: any) => {
      return addOrUpdateCart(user.uid, product);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['carts', user.uid]);
      },
    }
  );
  const removeCart = useMutation(
    (id: string) => {
      return removeFromCart(user.uid, id);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['carts', user.uid]);
      },
    }
  );
  const handleMinusClick = () => {
    if (product.quantity && product.quantity > 1) {
      addUpdateCart.mutate({ ...product, quantity: product.quantity - 1 });
    }
    // snackbar 추가
  };
  const handlePlusClick = () => {
    if (product.quantity) {
      addUpdateCart.mutate({ ...product, quantity: product.quantity + 1 });
    }
  };
  const handleRemoveClick = () => {
    removeCart.mutate(product.id);
  };
  return (
    <li className="flex justify-between mb-2">
      <div className="flex items-center">
        <img className="w-36 lg:w-44" src={image} alt={title} />
        <div className="flex flex-col ml-2">
          <p>{title}</p>
          <p className="text-brand font-bold">{option}</p>
          <p>₩{price}</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <AiOutlineMinusSquare
          onClick={handleMinusClick}
          className="cursor-pointer hover:bg-gray-200"
        />
        <p>{quantity}</p>
        <AiOutlinePlusSquare
          onClick={handlePlusClick}
          className="cursor-pointer hover:bg-gray-200"
        />
        <HiTrash className="cursor-pointer" onClick={handleRemoveClick} />
      </div>
    </li>
  );
}

export default CartItem;
