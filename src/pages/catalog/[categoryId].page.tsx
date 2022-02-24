import React from 'react';
import MainLayout from '../MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { getStore } from 'store/store';
import { default as CatalogPage } from 'pages-layout/catalog-page/ui/CatalogPage';
import { catalogModel } from 'entities/catalog';
import { getServerSideStore } from 'store';
import { setCategoryId } from 'entities/catalog/model';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const store = getStore();
  const categoryId = context.params?.categoryId;

  await getServerSideStore();

  if (typeof categoryId === 'string') {
    store.dispatch(setCategoryId(categoryId));

    await store.dispatch(
      catalogModel.thunks.loadProductsWithPagination({
        categoryId,
        page: 1,
        limit: 20,
      }),
    );
  }

  return {
    props: {
      preloadedState: store.getState(),
    },
  };
};

const Catalog: NextPage = () => {
  return (
    <MainLayout title="Каталог">
      <CatalogPage />
    </MainLayout>
  );
};

export default Catalog;
