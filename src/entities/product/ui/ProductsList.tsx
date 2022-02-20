import { Box, Stack, Typography } from '@mui/material';
import { Category } from 'shared/types';
import ProductsItem from './ProductsItem';
import { AddToCart } from 'features/add-to-cart';
import Link from 'next/link';

type ProductsListProps = {
  category: Category;
  rowItems: number;
};

const ProductsList = ({ category, rowItems }: ProductsListProps) => {
  const renderingProducts = category.products.slice(0, rowItems);

  return (
    <Box>
      <Link
        href={{
          pathname: `/catalog/${category._id}`,
          query: { name: category.name },
        }}
      >
        <a>
          <Typography gutterBottom variant="h4" component="h2">
            {category.name}
          </Typography>
        </a>
      </Link>

      <Stack direction="row" justifyContent="center" spacing={5}>
        {renderingProducts.map((product) => (
          <ProductsItem key={product._id} product={product}>
            {/* TODO: AddToCart не должен тут находиться. Композиция должна быть на уровне widget, page или app */}
            <AddToCart product={product} />
          </ProductsItem>
        ))}
      </Stack>
    </Box>
  );
};

export default ProductsList;
