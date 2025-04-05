'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function saveMateBookmark(params: {
  id: string;
  userId: string;
}) {
  try {
    await mateService.save(params);
    return { success: true };
  } catch (error) {
    console.error('Failed to save bookmark:', error);
    return { success: false, error };
  }
}

export async function cancelMateBookmark(params: {
  id: string;
  userId: string;
}) {
  try {
    await mateService.cancelSave(params);
    return { success: true };
  } catch (error) {
    console.error('Failed to cancel bookmark:', error);
    return { success: false, error };
  }
} 