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
        className="max-w-[768px] mx-auto bg-white overflow-hidden"
        style={
          {
            // minHeight: innerHeight ?? '100dvh',
          }
        }
      >
        {children}
      </div>
    </MobileScreenContext.Provider>
  );
};
