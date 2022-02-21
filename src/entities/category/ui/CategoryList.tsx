import styles from './CategoryList.module.css';
import { Divider, Stack } from '@mui/material';
import ProductsList from 'entities/product/ui/ProductsList';
import { useSelector } from 'react-redux';
import categoriesSelector from '../model/categoriesSelectors';
import { useWindowWidth } from 'shared/hooks/useWindowWidth';

const CategoryList = () => {
  const categories = useSelector(categoriesSelector.categories);
  const width = useWindowWidth();
  let rowItems = 5;

  if (width > 1200) {
    rowItems = 5;
  } else if (width > 960) {
    rowItems = 4;
  } else if (width > 720) {
    rowItems = 3;
  } else if (width > 480) {
    rowItems = 2;
  } else {
    rowItems = 1;
  }

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

export default CategoryList;
