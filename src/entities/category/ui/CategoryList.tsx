import styles from './CategoryList.module.css';
import { Divider, Stack } from '@mui/material';
import ProductsList from 'entities/product/ui/ProductsList';
import { useSelector } from 'react-redux';
import categoriesSelector from '../model/categoriesSelectors';


const CategoryList = () => {
  const categories = useSelector(categoriesSelector.categories);
  console.log('render CategoryList');

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
