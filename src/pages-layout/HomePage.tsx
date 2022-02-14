import React from 'react';
import { Container } from '@mui/material';
import CategoryList from 'entities/category/ui/CategoryList';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <CategoryList />
    </Container>
  );
};

export default HomePage;
