import { PaginationWrapper, Product } from 'shared/types';
import { axiosInstance } from '../axiosInstance';

type GetProductsResponse = PaginationWrapper<Product[]>;

export const getProducts = async (categoryId: string): Promise<Product[]> => {
  try {
    const res = await axiosInstance.get<GetProductsResponse>(
      `/products?category=${categoryId}`,
    );
    const products: Product[] = res.data.data;
    return products;
  } catch (e) {
    console.log(e);
    return [];
  }
};
