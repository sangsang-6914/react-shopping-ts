import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCarts } from '../api/firebase';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { useAuth } from '../context/AuthContextProvider';
import { IProduct } from '../interface/product';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { TbEqual } from 'react-icons/tb';
import Button from '../components/Button';

const DELIVERY_FEE = 3000;

function MyCart() {
  const { user } = useAuth();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<any>(['carts', user.uid], () => getCarts(user.uid));
  const totalPrice =
    products &&
    products.reduce(
      (prev: any, cur: any) => prev + parseInt(cur.price) * cur.quantity,
      0
    );

  console.log(totalPrice);
  return (
    <section className="p-4 flex flex-col">
      <p className="text-center text-xl font-bold my-3">내 장바구니</p>
      <ul className="border-y border-gray-300 p-3">
        {products ? (
          products.map((product: any) => (
            <CartItem key={product.id} product={product} />
          ))
        ) : (
          <p>장바구니가 비었습니다.</p>
        )}
      </ul>
      <div className="flex justify-between p-10 items-center">
        <PriceCard text="상품 총액" price={totalPrice} />
        <BsFillPlusCircleFill />
        <PriceCard text="배송액" price={DELIVERY_FEE} />
        <TbEqual />
        <PriceCard text="총가격" price={totalPrice + DELIVERY_FEE} />
      </div>
      <Button text="상품 구매하기" />
    </section>
  );
}

export default MyCart;
