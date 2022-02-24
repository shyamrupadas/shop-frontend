import { CategoryId, PaginationWrapper, Product } from 'shared/types';
import { axiosInstance } from '../axiosInstance';

export const fetchProductsWithPagination = async (
  categoryId: CategoryId,
  page: number = 1,
  limit: number = 20,
): Promise<PaginationWrapper<Product[]>> => {
  const response = await axiosInstance.get<PaginationWrapper<Product[]>>(
    `/products?category=${categoryId}&page=${page}&limit=${limit}`,
  );

  return response.data;
};
