import Image from 'next/image';
import { Product } from 'types/types';
import styles from './ProductsItem.module.css';

const ProductsItem = ({ product }: { product: Product}) => {
  return (
    <div className={styles.wrapper}>
      <Image width="200" height="170" src={product.iconUrl} alt={product.name} />
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.unitMeasure}>{product.unitMeasure}</div>
      <div className={styles.price}>{product.price} p</div>
    </div>
  );
};

export default ProductsItem;