'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function kickMember(params: {
  userId: string;
  mateId: string;
  creatorId: string;
}) {
  try {
    await mateService.fireMyTeamMember({
      userId: params.userId,
      mateId: params.mateId,
      creatorId: params.creatorId,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to kick member:', error);
    return { success: false, error };
  }
}
