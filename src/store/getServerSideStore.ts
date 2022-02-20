import { loadCartByUserIdThunk } from 'entities/cart/model/cart.thunks';
import getCategoriesThunk from 'entities/category/model/categoriesThunk';
import { userSelector } from 'entities/user/model/user.selectors';
import { getStore } from './store';

export const getServerSideStore = async () => {
  const store = getStore();
  const user = userSelector(store.getState());
  const userId = user._id;
  await Promise.all([
    store.dispatch(getCategoriesThunk()),
    store.dispatch(loadCartByUserIdThunk(userId)),
  ]);

  return {
    props: {
      preloadedState: store.getState(),
    },
  };
};
