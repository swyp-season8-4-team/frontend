'use client';

import React, { createContext } from 'react';
import { useMeasure } from 'react-use';
import { usePathname } from 'next/navigation';
import NavigationService from '@repo/usecase/src/navigationService';

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
  const pathname = usePathname();
  const navigationService = new NavigationService({});
  const isFullWidth = navigationService.isFullWidthPath(pathname);

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const { innerHeight } = useInnerSize();

  if (isFullWidth) {
    return <>{children}</>;
  }

  return (
    <MobileScreenContext.Provider value={{ width }}>
      <div
        ref={ref}
        className="mx-auto max-w-[768px] overflow-hidden bg-white"
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
