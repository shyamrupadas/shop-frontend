import axios from 'axios';
import { PaginationWrapper, Product } from 'shared/types/types';

type GetProductsResponse = PaginationWrapper<Product[]>;

const SERVER_URL = 'https://sbermarket-internship.herokuapp.com';

export const getProducts = async (categoryId: string): Promise<Product[]> => {
  try {
    const res = await axios.get<GetProductsResponse>(
      `${SERVER_URL}/products?category=${categoryId}`,
    );
    const products: Product[] = res.data.data;
    return products;
  } catch (e) {
    console.log(e);
    return [];
  }
};
