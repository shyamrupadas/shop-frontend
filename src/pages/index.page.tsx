import type { NextPage } from 'next';
import HomePage from '../pages-layout/HomePage';
import MainLayout from './MainLayout';
import { getServerSideStore } from 'store';

export const getServerSideProps = async () => await getServerSideStore();

const Home: NextPage = () => {
  return (
    <MainLayout title="Магазин">
      <HomePage />
    </MainLayout>
  );
};

export default Home;
