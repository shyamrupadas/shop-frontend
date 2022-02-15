import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  let innerWidth: number;
  typeof window === 'undefined'
    ? (innerWidth = 1920)
    : (innerWidth = window.innerWidth);

  const [width, setWidth] = useState(innerWidth);

  useEffect(() => {
    const handelResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handelResize);
    return () => window.removeEventListener('resize', handelResize);
  }, []);

  return width;
};
