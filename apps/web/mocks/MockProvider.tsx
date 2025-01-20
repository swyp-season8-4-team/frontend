"use client";

import { ReactNode, useEffect, useState } from "react";
import { initMSW } from ".";

interface MockProviderProp {
  children: ReactNode;
}

export const MockProvider = ({ children }: MockProviderProp) => {
  const [mockingEnabled, enableMocking] = useState(false);

  useEffect(() => {
    initMSW().then(() => {
      enableMocking(true);
    });
  }, []);

  if (!mockingEnabled) {
    return null;
  }

  return <>{children}</>;
};
