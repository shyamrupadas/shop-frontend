import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

const Document = () => {
  return (
    <CssBaseline>
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    </CssBaseline>
  )
}

export default Document;
