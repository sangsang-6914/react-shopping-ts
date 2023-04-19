import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts, writeProduct } from '../api/firebase';

function useProducts() {
  const client = useQueryClient();
  const fetchProducts = useQuery<any>(['products'], () => getProducts());
  const addProduct = useMutation(
    (product: any) => {
      return writeProduct(product);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['products']);
      },
    }
  );
  return { fetchProducts, addProduct };
}

export default useProducts;
