import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  let innerWidth: number;
  let rowItemsNumber = 5;

  typeof window === 'undefined'
    ? (innerWidth = 1920)
    : (innerWidth = window.innerWidth);

  const [width, setWidth] = useState(innerWidth);

  useEffect(() => {
    const handelResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handelResize);
    return () => window.removeEventListener('resize', handelResize);
  }, []);

  if (width > 1200) {
    rowItemsNumber = 5;
  } else if (width > 960) {
    rowItemsNumber = 4;
  } else if (width > 720) {
    rowItemsNumber = 3;
  } else if (width > 480) {
    rowItemsNumber = 2;
  } else {
    rowItemsNumber = 1;
  }

  return rowItemsNumber;
};
