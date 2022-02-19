import axios from 'axios';
import { Category, PaginationWrapper } from 'shared/types/types';

type GetCategoriesResponse = PaginationWrapper<Category[]>;

const SERVER_URL = 'https://sbermarket-internship.herokuapp.com';

export const getCategories = async (
  page = 1,
  limit = 10,
  productsLimit = 5,
): Promise<Category[]> => {
  try {
    const res = await axios.get<GetCategoriesResponse>(
      `${SERVER_URL}/categories?page=${page}&limit=${limit}&productsLimit=${productsLimit}`,
    );
    const categories: Category[] = res.data.data;
    return categories;
  } catch (e) {
    console.log(e);
    return [];
  }
};
