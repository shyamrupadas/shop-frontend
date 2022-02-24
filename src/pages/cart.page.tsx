import type { NextPage } from 'next';
import { getServerSideStore } from 'store';
import CartPage from 'pages-layout/CartPage';
import MainLayout from './MainLayout';

export const getServerSideProps = async () => await getServerSideStore();

const Cart: NextPage = () => {
  return (
    <MainLayout title="Корзина">
      <CartPage />
    </MainLayout>
  );
};

export default Cart;
