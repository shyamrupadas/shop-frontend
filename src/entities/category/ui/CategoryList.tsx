import { Divider, Stack } from '@mui/material';
import ProductsList from 'entities/product/ui/ProductsList';
import { useSelector } from 'react-redux';
import categoriesSelector from '../model/categoriesSelectors';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';
import React from 'react';
import { ProductCard } from 'widgets/product-card';

const CategoryList = () => {
  const categories = useSelector(categoriesSelector.categories);
  const rowItems = useWindowWidth();

  return (
    <Stack spacing={2} mt="32px" mb="32px" divider={<Divider flexItem />}>
      {categories.map((category) => {
        const renderingProducts = category.products.slice(0, rowItems);

        return (
          <ProductsList key={category._id} category={category}>
            {renderingProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductsList>
        );
      })}
    </Stack>
  );
};

export default CategoryList;
