'use client';

import { useEffect, useState } from 'react'

export const useInnerSize = () => {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    if (innerHeight !== window.innerHeight) {
      setInnerHeight(window.innerHeight);
    }
    
    if (innerWidth !== window.innerWidth) {
      setInnerWidth(window.innerWidth);
    }
  }, [innerHeight, innerWidth]);

  return {
    innerHeight,
    innerWidth,
  };
}
