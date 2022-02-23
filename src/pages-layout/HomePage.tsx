import React from 'react';
import { Container, Divider, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import categoriesSelector from '../entities/category/model/categoriesSelectors';
import { useWindowWidth } from 'shared/hooks';
import ProductsList from '../entities/product/ui/ProductsList';
import { ProductCard } from 'widgets/product-card';

const HomePage = () => {
  const categories = useSelector(categoriesSelector.categories);
  const rowItems = useWindowWidth();

  return (
    <Container maxWidth="lg">
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
    </Container>
  );
};

export default HomePage;
