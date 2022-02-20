import React from 'react';
import MainLayout from '../MainLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Product } from 'shared/types';
import { initStore } from 'store/store';
import { getProductsThunk } from 'entities/product/model/productsThunk';
// import { CatalogPage } from '../../pages-layout/CatalogPage';
import { default as CatalogPage } from 'pages-layout/catalog-page/ui/CatalogPage';
import { catalogModel } from 'entities/catalog';

type CatalogProps = {
  products: Product[];
};

// Todo: categoryId должно приходить из роутинга
const categoryId = '6206cc322d75374955d3e9e6';

export const getServerSideProps = async () => {
  const store = initStore();
  // await store.dispatch(getProductsThunk(categoryId));
  await store.dispatch(
    catalogModel.thunks.loadProductsWithPagination({
      categoryId,
      page: 1,
      limit: 20,
    }),
  );

  return {
    props: {
      preloadedState: store.getState(),
    },
  };
};

const Catalog: NextPage<CatalogProps> = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <MainLayout title="Каталог">
      <CatalogPage />
    </MainLayout>
  );
};

export default Catalog;
