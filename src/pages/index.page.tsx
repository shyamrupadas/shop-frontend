import type { NextPage } from 'next'
import HomePage from '../pages-layout/HomePage';
import MainLayout from './MainLayout';

const Home: NextPage = () => {
  return (
    <MainLayout title='Магазин'>
      <HomePage />
    </MainLayout>
  );
};

export default Home;
