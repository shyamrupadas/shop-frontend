import React from 'react';
import Head from 'next/head'

const MainLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <>
      <Head>
        <title>{title} | КлонМаркет</title>
        <meta name="description" content="Лучший интернет-магазин" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
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
