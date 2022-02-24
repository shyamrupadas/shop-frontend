import { Box, ButtonGroup, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Product } from 'shared/types';
import { useAddToCart } from '../../model';
import { useCallback } from 'react';

type AddToCartProps = {
  product: Product;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const {
    productCount,
    handleDecrementClick,
    handleIncrementClick,
    isMaxCount,
  } = useAddToCart(product);

  const _handleIncrementClick = useCallback(
    (event) => {
      event.stopPropagation();
      handleIncrementClick();
    },
    [handleIncrementClick],
  );

  const _handleDecrementClick = useCallback(
    (event) => {
      event.stopPropagation();
      handleDecrementClick();
    },
    [handleDecrementClick],
  );

  const handleEventPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <ButtonGroup aria-label="outlined primary button group" onClick={handleEventPropagation}>
      <IconButton
        color="primary"
        onClick={_handleDecrementClick}
        disabled={Boolean(productCount <= 0)}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '2ch',
        }}
      >
        <Typography
          sx={{ fontSize: 'default' }}
          color="text.secondary"
          component="span"
        >
          {productCount}
        </Typography>
      </Box>

      <IconButton
        color="primary"
        onClick={_handleIncrementClick}
        disabled={isMaxCount}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </ButtonGroup>
  );
};
