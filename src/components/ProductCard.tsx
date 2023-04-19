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
      className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-all"
    >
      <img src={image} alt={title} />
      <div className="flex justify-between px-2 text-lg">
        <p>{title}</p>
        <p>₩{price}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
}

export default ProductCard;
