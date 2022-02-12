import { CategoryOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Category } from 'shared/types/types';
import ProductsItem from './ProductsItem';

type ProductsListProps = {
  category: Category;
};

const ProductsList = ({ category } : ProductsListProps) => {

  return (
    <section>
      <h3>{category.name}</h3>
      <Stack direction="row" spacing={5}>
        {category.products.map((product) => {
          return <ProductsItem key={product._id} product={product} />
        })}
      </Stack>
    </section>
  );
};

export default ProductsList;
