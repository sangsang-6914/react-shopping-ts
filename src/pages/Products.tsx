import React from 'react';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

function Products() {
  const {
    fetchProducts: { data: products },
  } = useProducts();
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
