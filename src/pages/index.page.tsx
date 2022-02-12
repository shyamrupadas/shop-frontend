import type { NextPage } from 'next'
import getCategories from 'shared/api/categories/getCategories';
import { Category } from 'shared/types/types';
import HomePage from '../pages-layout/HomePage';
import MainLayout from './MainLayout';

type HomeProps = {
  categories: Category[];
}

const Home: NextPage<HomeProps> = ({ categories }) => {

  return (
    <MainLayout title='Магазин'>
      <HomePage categories={categories}/>
    </MainLayout>
  );
};

Home.getInitialProps = async () => {
  const categories = await getCategories();

  return(
    {
      categories,
    }
  )
}

export default Home;
