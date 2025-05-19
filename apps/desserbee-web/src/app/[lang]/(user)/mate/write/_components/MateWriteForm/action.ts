'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import type {
  MateWriteRequest,
  MateEditRequest,
  Mate,
} from '@repo/entity/src/mate';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function writeMatePost(data: MateWriteRequest) {
  const response = await mateService.write(data);
  return response;
}

export async function editMatePost(data: MateEditRequest): Promise<Mate> {
  const response = await mateService.edit(data);
  return response;
}
