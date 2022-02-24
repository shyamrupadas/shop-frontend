import { Typography } from '@mui/material';
import React from 'react';

type ProductSumProps = {
  sum: number;
};

export const ProductSum = ({ sum }: ProductSumProps) => {
  return (
    <Typography sx={{ fontSize: 'default', fontWeight: 'bold' }}>
      {sum} ₽
    </Typography>
  );
};
