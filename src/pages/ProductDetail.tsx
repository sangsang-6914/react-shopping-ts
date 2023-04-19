import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContextProvider';
import useCarts from '../hooks/useCarts';

function ProductDetail() {
  const { state: product } = useLocation();
  const { user } = useAuth();
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
      <section className="flex flex-col md:flex-row p-4">
        <div className="basis-7/12 px-4">
          <img className="w-full h-full" src={image} alt={title} />
        </div>
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h1 className="text-3xl font-bold py-2">{title}</h1>
          <p className="text-2xl font-bold border-b border-gray-400 py-2">
            ₩{price}
          </p>
          <p className="pt-4 pb-1 text-lg">{description}</p>
          <div className="flex items-center">
            <p className="text-brand font-bold">옵션: </p>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="border-dashed border-brand p-2 m-4 flex-1 border-2 outline-none"
            >
              {options &&
                options.map((option: any) => (
                  <option value={option}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="font-bold my-2">{success}</p>}
          <Button
            disabled={!!!user}
            onClick={handleClick}
            text="장바구니에 추가"
          />
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
