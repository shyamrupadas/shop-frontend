import { useEffect, useState } from 'react';
import { throttle } from '@martinstark/throttle-ts';

export const useWindowWidth = () => {
  let clientWidth: number;
  let rowItemsNumber = 5;

  typeof window === 'undefined'
    ? (clientWidth = 1920)
    : (clientWidth = document.documentElement.clientWidth);

  const [width, setWidth] = useState(clientWidth);

  useEffect(() => {
    const handelResize = () => setWidth(document.documentElement.clientWidth);
    const [throttledHandelResize] = throttle(handelResize, 200);

    window.addEventListener('resize', throttledHandelResize);
    return () => window.removeEventListener('resize', throttledHandelResize);
  }, []);

  if (width > 1119) {
    rowItemsNumber = 5;
  } else if (width > 959) {
    rowItemsNumber = 4;
  } else if (width > 719) {
    rowItemsNumber = 3;
  } else if (width > 479) {
    rowItemsNumber = 2;
  } else {
    rowItemsNumber = 1;
  }

  return rowItemsNumber;
};
