import { RootState } from "store/store";
import { categoriesEntityAdapter } from "./categoriesSlice";

const {
  selectIds: categoriesIds,
  selectById: categoryById,
  selectAll: categories,
} = categoriesEntityAdapter.getSelectors((state: RootState) => state.categories);

const categoriesSelector = {
  categoriesIds,
  categoryById,
  categories,
};

export default categoriesSelector;
