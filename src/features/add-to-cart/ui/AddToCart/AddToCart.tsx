import { Box, ButtonGroup, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Product } from 'shared/types';
import { useAddToCart } from '../../model';

type AddToCartProps = {
  product: Product;
};

export function AddToCart({ product }: AddToCartProps) {
  const {
    productCount,
    handleDecrementClick,
    handleIncrementClick,
    isMaxCount,
  } = useAddToCart(product);

  return (
    <ButtonGroup aria-label="outlined primary button group">
      <IconButton
        color="primary"
        onClick={handleDecrementClick}
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
        onClick={handleIncrementClick}
        disabled={isMaxCount}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </ButtonGroup>
  );
}
