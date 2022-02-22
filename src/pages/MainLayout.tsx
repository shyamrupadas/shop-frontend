import React from 'react';
import Head from 'next/head';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import style from './MainLayout.module.css';

const MainLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className={style.wrapper}>
      <Head>
        <title>{title} | КлонМаркет</title>
        <meta name="description" content="Лучший интернет-магазин" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
