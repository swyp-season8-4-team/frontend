"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { initMSW } from ".";

export const MockProvider = ({ children }: PropsWithChildren) => {
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
