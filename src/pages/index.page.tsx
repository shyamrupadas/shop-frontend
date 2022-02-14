import type { NextPage } from 'next';
import HomePage from '../pages-layout/HomePage';
import MainLayout from './MainLayout';
import { Category } from 'shared/types/types';
import store, { useAppDispatch } from 'store/store';
import getCategoriesThunk from 'entities/category/model/categoriesThunk';
import categoriesSelector from 'entities/category/model/categoriesSelectors';
import { setCategories } from 'entities/category/model/categoriesSlice';

type HomeProps = {
  categories: Category[];
};

export const getServerSideProps = async () => {
  await store.dispatch(getCategoriesThunk());
  const categories = categoriesSelector.categories(store.getState());

  return {
    props: { categories },
  };
};

const Home: NextPage<HomeProps> = ({ categories }) => {
  const dispatch = useAppDispatch();
  dispatch(setCategories(categories));

  return (
    <MainLayout title="Магазин">
      <HomePage />
    </MainLayout>
  );
};

export default Home;
