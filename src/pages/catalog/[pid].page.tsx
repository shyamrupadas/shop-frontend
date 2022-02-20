import React from 'react';
import MainLayout from '../MainLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CatalogPage } from '../../pages-layout/CatalogPage';
import { getServerSideStore } from 'store';
import { productsHooks } from 'entities/product/model';

export const getServerSideProps = async () => await getServerSideStore();

const Catalog: NextPage = () => {
  const router = useRouter();
  const pid = typeof router.query.pid === 'string' ? router.query.pid : '';

  productsHooks.useProductsLoad(pid);

  return (
    <MainLayout title="Каталог">
      <CatalogPage />
    </MainLayout>
  );
};

export default Catalog;
