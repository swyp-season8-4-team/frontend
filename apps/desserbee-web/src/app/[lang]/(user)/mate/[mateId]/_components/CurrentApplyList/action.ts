'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function acceptMateRequest(params: {
  creatorUserId: string;
  userId: string;
  mateId: string;
}) {
  try {
    await mateService.acceptMyTeamMember(params);
    return { success: true };
  } catch (error) {
    console.error('Failed to accept mate request:', error);
    return { success: false, error };
  }
}

export async function rejectMateRequest(params: {
  creatorUserId: string;
  userId: string;
  mateId: string;
}) {
  try {
    await mateService.rejectMyTeamMember(params);
    return { success: true };
  } catch (error) {
    console.error('Failed to reject mate request:', error);
    return { success: false, error };
  }
}
