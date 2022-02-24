import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from 'store/store';
import { useEffect } from 'react';
import { catalogModel } from 'entities/catalog';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps?.preloadedState);

  useEffect(() => {
    store.dispatch(
      catalogModel.setCatalogInfo(pageProps?.preloadedState.catalog),
    );
  }, [store, pageProps]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
