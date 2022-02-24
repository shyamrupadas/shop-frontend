import { cartModel } from 'entities/cart';
// import { openedProduct as openedProductSelector } from 'entities/catalog/model/catalog.selectors';
import { useAppDispatch, useAppSelector } from 'store';
import { ProductCard } from 'entities/product';
import { useCallback } from 'react';
import { catalogModel } from 'entities/catalog';
import { AddToCart } from 'features/add-to-cart';

export const ProductModal = () => {
  const openedProduct = useAppSelector(catalogModel.selectors.openedProduct);
  const { closeProductDetail, isOpened } =
    catalogModel.hooks.useProductDetail(openedProduct);

  const productSum = cartModel.hooks.usePositionSumSelector(
    openedProduct?._id || '',
  );

  if (!openedProduct) {
    return null;
  }

  return (
    <ProductCard
      product={openedProduct}
      isOpen={isOpened}
      onClose={closeProductDetail}
      productSum={productSum || 0}
    >
      <AddToCart product={openedProduct} />
    </ProductCard>
  );
};
