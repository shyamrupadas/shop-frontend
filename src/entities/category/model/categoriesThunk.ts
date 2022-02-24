import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from 'shared/api/categories';

export const getCategoriesThunk = createAsyncThunk(
  'articles/fetchArticlesThunk',
  async () => {
    const categories = getCategories();
    return categories;
  },
);
