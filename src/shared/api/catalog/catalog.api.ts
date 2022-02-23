import { CategoryId, PaginationWrapper, Product } from 'shared/types';
import axios from 'axios';

export const fetchProductsWithPagination = async (
  categoryId: CategoryId,
  page: number = 1,
  limit: number = 20,
): Promise<PaginationWrapper<Product[]>> => {
  const response = await axios.get<PaginationWrapper<Product[]>>(
    `https://sbermarket-internship.herokuapp.com/products?category=${categoryId}&page=${page}&limit=${limit}`,
  );

  return response.data;
};
