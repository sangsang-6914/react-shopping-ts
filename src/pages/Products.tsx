import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

function Products() {
  const {
    fetchProducts: { data: products, isLoading },
  } = useProducts();
  return (
    <section className="mt-2">
      {isLoading && <p>Loading...</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products &&
          products.map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </ul>
    </section>
  );
}

export default Products;
