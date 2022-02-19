import React from 'react';
import Head from 'next/head';
import { Header } from '../widgets/header';
import { Footer } from '../widgets/footer';

const MainLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <Head>
        <title>{title} | КлонМаркет</title>
        <meta name="description" content="Лучший интернет-магазин" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
