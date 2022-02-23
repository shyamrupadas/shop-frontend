import { Box, Stack, Typography } from '@mui/material';
import { Category } from 'shared/types';
import Link from 'next/link';
import React from 'react';

type ProductsListProps = {
  category: Category;
  children: React.ReactNode;
};

const ProductsList = ({ category, children }: ProductsListProps) => {
  const pathname = `/catalog/${category._id}`;

  return (
    <Box>
      <Link href={{ pathname }}>
        <a>
          <Typography gutterBottom variant="h4" component="h2">
            {category.name}
          </Typography>
        </a>
      </Link>

      <Stack direction="row" justifyContent="center" spacing={5}>
        {children}
      </Stack>
    </Box>
  );
};

export default ProductsList;
