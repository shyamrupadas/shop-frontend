import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from 'store/store';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps?.preloadedState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
