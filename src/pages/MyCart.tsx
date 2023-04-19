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
    <section className="p-8 flex flex-col">
      <p className="ttext-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      <ul className="border-b border-gray-300 mb-8 p-4 px-8">
        {products ? (
          products.map((product: any) => (
            <CartItem key={product.id} product={product} />
          ))
        ) : (
          <p>장바구니가 비었습니다.</p>
        )}
      </ul>
      <div className="flex justify-between items-center px-2 md:p-8 lg:px-16 mb-6">
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
