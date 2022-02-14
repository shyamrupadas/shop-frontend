import { Stack } from '@mui/material';
import { Category } from 'shared/types/types';
import ProductsItem from './ProductsItem';
import { AddToCart } from '../../../features/add-to-cart';

type ProductsListProps = {
  category: Category;
};

const ProductsList = ({ category } : ProductsListProps) => {
  return (
    <section>
      <h3>{category.name}</h3>
      <Stack direction="row" spacing={5}>
        {category.products.map((product) => (
            <ProductsItem key={product._id} product={product}>
                {/*
                    TODO: AddToCart не должен тут находиться.
                     Композиция должна быть на уровне widget, page или app
                 */}
                <AddToCart productId={product._id} />
            </ProductsItem>
        ))}
      </Stack>
    </section>
  );
};

export default ProductsList;
