import { Box, Stack, Typography } from '@mui/material';
import { Category, Product } from 'shared/types/types';
import ProductsItem from './ProductsItem';
import { AddToCart } from '../../../features/add-to-cart';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';

type ProductsListProps = {
  category: Category;
};

const ProductsList = ({ category }: ProductsListProps) => {
  const width = useWindowWidth();

  let renderingProducts: Product[];

  if (width > 1200) {
    renderingProducts = category.products.slice(0, 5);
  } else if (width > 960) {
    renderingProducts = category.products.slice(0, 4);
  } else if (width > 720) {
    renderingProducts = category.products.slice(0, 3);
  } else if (width > 480) {
    renderingProducts = category.products.slice(0, 2);
  } else {
    renderingProducts = category.products.slice(0, 1);
  }

  return (
    <Box>
      <Typography gutterBottom variant="h4" component="h2">
        {category.name}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={5}>
        {renderingProducts.map((product) => (
          <ProductsItem key={product._id} product={product}>
            {/*
                    TODO: AddToCart не должен тут находиться.
                     Композиция должна быть на уровне widget, page или app
                 */}
            <AddToCart product={product} />
          </ProductsItem>
        ))}
      </Stack>
    </Box>
  );
};

export default ProductsList;
