import { Category, PaginationWrapper } from 'shared/types/types';
import { axiosInstance } from '../axiosInstance';

type GetCategoriesResponse = PaginationWrapper<Category[]>;

export const getCategories = async (
  page = 1,
  limit = 10,
  productsLimit = 5,
): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get<GetCategoriesResponse>(
      `/categories?page=${page}&limit=${limit}&productsLimit=${productsLimit}`,
    );
    const categories: Category[] = res.data.data;
    return categories;
  } catch (e) {
    console.log(e);
    return [];
  }
};
