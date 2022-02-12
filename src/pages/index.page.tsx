import type { NextPage } from 'next'
import HomePage from '../pages-layout/HomePage';
import MainLayout from './MainLayout';
import { Category } from 'shared/types/types';
import store, { useAppDispatch } from 'store/store';
import getCategoriesThunk from 'entities/category/model/categoriesThunk';
import { setCategories } from 'entities/category/model/categoriesSlice';

type HomeProps = {
  categories: Category[];
}

export const getServerSideProps = async () => {
  await store.dispatch(getCategoriesThunk());
  const categories = Object.values(store.getState().categories.entities);

  return {
    props: { categories }
  }
}

const Home: NextPage<HomeProps> = ({ categories }) => {
  const dispatch = useAppDispatch();
  dispatch(setCategories(categories));

  return (
    <MainLayout title='Магазин'>
      <HomePage />
    </MainLayout>
  );
};

export default Home;
