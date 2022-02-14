import axios from 'axios';
import { Category } from 'shared/types/types';

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await axios.get(
      'https://sbermarket-internship.herokuapp.com/categories',
    );
    const categories: Category[] = res.data;
    return categories;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getCategories;
