import { cartModel } from 'entities/cart';
import { categoryModel } from 'entities/category';
import { userModel } from 'entities/user';
import { getStore } from './store';

export const getServerSideStore = async () => {
  const store = getStore();
  const user = userModel.selectors.userSelector(store.getState());
  const userId = user._id;
  await Promise.all([
    store.dispatch(categoryModel.thunks.getCategoriesThunk()),
    store.dispatch(cartModel.thunks.loadCartByUserIdThunk(userId)),
  ]);

  return {
    props: {
      preloadedState: store.getState(),
    },
  };
};
