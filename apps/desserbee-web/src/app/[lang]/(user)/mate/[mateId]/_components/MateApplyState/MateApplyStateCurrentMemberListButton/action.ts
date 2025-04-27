'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function kickMember(params: {
  userId: string;
  mateId: string;
  creatorId: string;
}) {
  await commonErrorHandler(
    mateService.fireMyTeamMember({
      userId: params.userId,
      mateId: params.mateId,
      creatorId: params.creatorId,
    }),
  );
}
