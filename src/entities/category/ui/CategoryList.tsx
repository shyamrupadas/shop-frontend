import styles from './CategoryList.module.css';
import { Divider, Stack } from '@mui/material';
import ProductsList from 'entities/product/ui/ProductsList';
import categories from './categories';

const CategoryList = () => {
  return (
    <div className={styles.wrapper}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        {categories.map((category, index) => {
          return (
            <ProductsList key={`category${index}`} category={category} />
          )
        })}
      </Stack>
    </div>
  );
};

export default CategoryList;
