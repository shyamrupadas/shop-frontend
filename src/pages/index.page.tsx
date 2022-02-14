import type { NextPage } from 'next';
import HomePage from '../pages-layout/HomePage';
import MainLayout from './MainLayout';
import { Category } from 'shared/types/types';
import { initStore } from 'store/store';
import getCategoriesThunk from 'entities/category/model/categoriesThunk';

type HomeProps = {
  categories: Category[];
};

export const getServerSideProps = async () => {
  const store = initStore();
  await store.dispatch(getCategoriesThunk());

  return {
    props: {
      preloadedState: store.getState(),
    },
  };
};

const Home: NextPage<HomeProps> = () => {
  return (
    <MainLayout title="Магазин">
      <HomePage />
    </MainLayout>
  );
};

export default Home;
