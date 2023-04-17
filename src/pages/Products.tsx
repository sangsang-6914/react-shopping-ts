import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/firebase';
import ProductCard from '../components/ProductCard';
import { IProduct } from '../interface/product';

function Products() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<any>(['products'], () => getProducts());
  console.log(products);
  return (
    <section className="mt-2">
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {products &&
          products.map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </ul>
    </section>
  );
}

export default Products;
