import type { NextPage } from 'next'
import CartPage from '../pages-layout/CartPage';
import MainLayout from './MainLayout';

const Cart: NextPage = () => {
  return (
    <MainLayout title='Корзина'>
      <CartPage />
    </MainLayout>
  );
};

export default Cart;
