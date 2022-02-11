import { Stack } from '@mui/material';
import { Category } from 'types/types';
import ProductsItem from './ProductsItem';

const ProductsList = ({ category } : { category: Category}) => {
  const [
    product1,
    product2,
    product3,
    product4,
    product5,
  ] = category.products;

  return (
    <section>
      <h3>{category.name}</h3>
      <Stack direction="row" spacing={5}>
        <ProductsItem product={product1} />
        <ProductsItem product={product2}/>
        <ProductsItem product={product3}/>
        <ProductsItem product={product4}/>
        <ProductsItem product={product5}/>
      </Stack>
    </section>
  );
};

export default ProductsList;