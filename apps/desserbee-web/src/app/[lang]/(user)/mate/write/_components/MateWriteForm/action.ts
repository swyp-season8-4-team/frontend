'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import type { MateWriteRequest, MateEditRequest } from '@repo/entity/src/mate';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function writeMatePost(data: MateWriteRequest) {
  try {
    const response = await mateService.write(data);
    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to write mate post:', error);
    return { success: false, error };
  }
}

export async function editMatePost(data: MateEditRequest) {
  try {
    await mateService.edit(data);
    return { success: true, data: { id: data.id } };
  } catch (error) {
    console.error('Failed to edit mate post:', error);
    return { success: false, error };
  }
}
