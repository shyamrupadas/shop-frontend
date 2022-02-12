import Image from 'next/image';
import { Product } from 'shared/types/types';
import styles from './ProductsItem.module.css';

type ProductsItemProps= {
  product: Product;
};

const ProductsItem = ({ product }: ProductsItemProps) => {
  return (
    <div className={styles.wrapper}>
      <Image
        width="200"
        height="170"
        src={product.iconUrl}
        alt={product.name}
        priority={true}
      />
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.unitMeasure}>{product.unitMeasure}</div>
      <div className={styles.price}>{product.price} p</div>
    </div>
  );
};

export default ProductsItem;
