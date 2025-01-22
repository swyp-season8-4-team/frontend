"use client";

import { useEffect } from "react";
import { initMSW } from ".";

export const MockInitializer = () => {
  useEffect(() => {
    initMSW();
  }, []);

  return null;
};
