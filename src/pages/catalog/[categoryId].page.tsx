import React from 'react';
import MainLayout from '../MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getStore } from 'store/store';
import { default as CatalogPage } from 'pages-layout/catalog-page/ui/CatalogPage';
import { catalogModel } from 'entities/catalog';
import { getServerSideStore } from 'store';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const store = getStore();
  const categoryId = context.params?.categoryId;

  await getServerSideStore();

  if (typeof categoryId === 'string') {
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
  const router = useRouter();
  const pid = typeof router.query.pid === 'string' ? router.query.pid : '';
  // TODO: Почему название категории передается через роутинг?
  const name = typeof router.query.name === 'string' ? router.query.name : '';

  const rowItemsNumber = useWindowWidth();

  return (
    <MainLayout title="Каталог">
      <CatalogPage name={name} rowItemsNumber={rowItemsNumber} />
    </MainLayout>
  );
};

export default Catalog;
