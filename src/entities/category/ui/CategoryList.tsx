import styles from './CategoryList.module.css';
import { Divider, Stack } from '@mui/material';
import { ProductsList } from 'entities/product';
import { useSelector } from 'react-redux';
import { categoriesSelector } from '../model';
import { useWindowWidth } from 'shared/hooks';

export const CategoryList = () => {
  const categories = useSelector(categoriesSelector.categories);
  const rowItems = useWindowWidth();

  return (
    <div className={styles.wrapper}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        {categories.map((category) => {
          return (
            <ProductsList
              key={category._id}
              category={category}
              rowItems={rowItems}
            />
          );
        })}
      </Stack>
    </div>
  );
};
