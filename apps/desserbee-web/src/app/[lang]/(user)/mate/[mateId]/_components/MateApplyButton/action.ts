'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function applyMate(mateId: string, userId: string) {
  try {
    await mateService.applyMate({ mateId, userId });
    return { success: true };
  } catch (error) {
    console.error('Failed to apply mate:', error);
    return { success: false, error };
  }
}

export async function cancelApplyMate(mateId: string, userId: string) {
  try {
    await mateService.cancelApplyMate({ mateId, userId });
    return { success: true };
  } catch (error) {
    console.error('Failed to cancel apply mate:', error);
    return { success: false, error };
  }
}
