import styles from './CategoryList.module.css';
import { Divider, Stack } from '@mui/material';
import ProductsList from 'entities/product/ui/ProductsList';
import { Category } from 'shared/types/types';

type CategoryListProps = {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className={styles.wrapper}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        {categories.map((category) => {
          return (
            <ProductsList key={category._id} category={category} />
          )
        })}
      </Stack>
    </div>
  );
};

export default CategoryList;
