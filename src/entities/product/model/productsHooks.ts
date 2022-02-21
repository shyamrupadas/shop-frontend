import { useEffect } from 'react';
import { useAppDispatch } from 'store';
import { getProductsThunk } from './productsThunk';

export const useProductsLoad = (pid: string): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getProductsThunk(pid));

    return () => {
      promise.abort();
    };
  }, [dispatch, pid]);
};
