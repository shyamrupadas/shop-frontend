import React from 'react';
import { Container } from '@mui/material';
import CategoryList from 'entities/category/ui/CategoryList';
import { Category } from 'shared/types/types';

type HomePageProps = {
  categories: Category[];
}

const HomePage = ({ categories }: HomePageProps) => {
  return (
    <Container maxWidth="lg">
      <CategoryList categories={categories}/>
    </Container>
  );
};

export default HomePage;
