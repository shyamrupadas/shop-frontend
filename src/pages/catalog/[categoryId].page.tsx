import React, { useEffect } from 'react';
import MainLayout from '../MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getStore } from 'store/store';
import { default as CatalogPage } from 'pages-layout/catalog-page/ui/CatalogPage';
import { catalogModel } from 'entities/catalog';
import { getServerSideStore, useAppDispatch, useAppSelector } from 'store';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';
import categoriesSelector from 'entities/category/model/categoriesSelectors';
import { setCategoryId } from 'entities/catalog/model';

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
  const dispatch = useAppDispatch();

  const categoryId =
    typeof router.query.categoryId === 'string' ? router.query.categoryId : '';

  const catalog = useAppSelector(catalogModel.selectors.catalog);

  const rowItemsNumber = useWindowWidth();
  const isRowsChanges =
    catalog.limit / rowItemsNumber !== catalog.columnItemsNumber;

  useEffect(() => {
    if (categoryId !== catalog.categoryId || isRowsChanges) {
      dispatch(setCategoryId(categoryId));
    }
  }, [catalog.categoryId, categoryId, dispatch, isRowsChanges]);

  const category = useAppSelector((state) =>
    categoriesSelector.categoryById(state, categoryId),
  );

  const name = typeof category !== 'undefined' ? category.name : '';

  return (
    <MainLayout title="Каталог">
      <CatalogPage name={name} rowItemsNumber={rowItemsNumber} />
    </MainLayout>
  );
};

export default Catalog;
