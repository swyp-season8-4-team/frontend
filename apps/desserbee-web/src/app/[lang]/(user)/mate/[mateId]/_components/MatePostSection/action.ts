'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function getMyTeamMembers(mateId: string) {
  try {
    const response = await mateService.getMyTeamMembers({
      id: mateId,
    });

    return response;
  } catch (error) {
    console.error('Failed to get my team members:', error);
    return [];
  }
}
