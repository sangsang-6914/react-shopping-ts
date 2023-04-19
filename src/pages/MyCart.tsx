import React from 'react';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { TbEqual } from 'react-icons/tb';
import Button from '../components/Button';
import useCarts from '../hooks/useCarts';

const DELIVERY_FEE = 3000;

function MyCart() {
  const {
    fetchCart: { data: products },
  } = useCarts();
  const totalPrice: any =
    products &&
    products.reduce(
      (prev: any, cur: any) => prev + parseInt(cur.price) * cur.quantity,
      0
    );

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
