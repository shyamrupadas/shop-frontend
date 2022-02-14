import { EntityState } from "@reduxjs/toolkit";
import { Category } from "shared/types/types";
import { RootState } from "store/store";
import { categoriesEntityAdapter } from "./categoriesSlice";

const {
  selectIds: categoriesIds,
  selectById: categoryById,
  selectAll: categories,
} = categoriesEntityAdapter.getSelectors((state: RootState): EntityState<Category> => state.categories);

const categoriesSelector = {
  categoriesIds,
  categoryById,
  categories,
};

export default categoriesSelector;
