'use server';

import { encrypt } from '@/utils/crypto';

export const getState = async () => {
  const state = encrypt(`${Date.now()}`);

  return state;
};
