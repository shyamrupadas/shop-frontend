import React from 'react';
import Head from 'next/head'
import { cartModel } from 'entities/cart';

const MainLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  cartModel.hooks.useCartLoad();

  return (
    <>
      <Head>
        <title>{title} | КлонМаркет</title>
        <meta name="description" content="Лучший интернет-магазин" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        Header
      </header>
      <main>
        {children}
      </main>
      <footer>
        Footer
      </footer>
    </>
  );
};

export default MainLayout;
