import React from 'react';
import { Container } from '@mui/material';
import CategoryList from 'entities/category/ui/CategoryList';
import { useSelector } from 'react-redux';
import categoriesSelector from 'entities/category/model/categoriesSelectors';

const HomePage = () => {
  const categories = useSelector(categoriesSelector.categories);
  console.log('render HomePage');
  
  return (
    <Container maxWidth="lg">
      <CategoryList categories={categories}/>
    </Container>
  );
};

export default HomePage;
