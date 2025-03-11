'use client';

import React, { createContext } from 'react';
import { useMeasure } from 'react-use';

import type { WithChildren } from '@repo/ui/index';
import { useInnerSize } from '../../_hooks/useInnerSize';

interface State {
  width: number;
}

const defaultState: State = {
  width: 768,
};

export const MobileScreenContext = createContext<State>(defaultState);

interface Props extends WithChildren {
  backgroundColor?: string;
}

export const MobileScreenProvider = (props: Props) => {
  const { children } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const { innerHeight } = useInnerSize();

  return (
    <MobileScreenContext.Provider value={{ width }}>
      <div
        ref={ref}
        style={{
          maxWidth: '768px',
          marginLeft: 'auto',
          marginRight: 'auto',
          // minHeight: innerHeight ?? '100vh',
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </MobileScreenContext.Provider>
  );
};
