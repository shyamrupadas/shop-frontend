import { createAsyncThunk } from "@reduxjs/toolkit";
import getCategories from "shared/api/categories/getCategories";

const getCategoriesThunk = createAsyncThunk(
  'articles/fetchArticlesThunk',
  async () => {
    const categories = getCategories();
    return categories;
  }
);

export default getCategoriesThunk;
