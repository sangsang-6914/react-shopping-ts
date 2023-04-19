import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { addOrUpdateCart, getCarts, removeFromCart } from '../api/firebase';
import { useAuth } from '../context/AuthContextProvider';

function useCarts() {
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

  const fetchCart = useQuery(
    ['carts', user?.uid || ''],
    () => getCarts(user?.uid),
    {
      enabled: !!user?.uid,
    }
  );

  return { addUpdateCart, fetchCart, removeCart };
}

export default useCarts;
