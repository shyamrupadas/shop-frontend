import { AddToCart } from 'features/add-to-cart';
import { ProductsItem } from 'entities/product';
import React from 'react';
import { catalogModel } from 'entities/catalog';
import { Product } from 'shared/types';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { openProductDetail } = catalogModel.hooks.useProductDetail(product);

  return (
    <ProductsItem
      key={product._id}
      product={product}
      onClick={openProductDetail}
    >
      <AddToCart product={product} />
    </ProductsItem>
  );
};
