'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function deleteMatePost(mateId: string) {
  try {
    await mateService.delete({
      id: mateId,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete mate post:', error);
    return { success: false, error };
  }
}
