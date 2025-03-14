'use server';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import type { SavedMateListResponse } from '@repo/entity/src/mate';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function getSavedMateList({
  from,
  to,
}: {
  from: number;
  to: number;
}): Promise<SavedMateListResponse> {
  return mateService.getSavedMateList({ from, to });
}

export async function saveMate({ id, userId }: { id: string; userId: string }) {
  return mateService.save({ id, userId });
}

export async function cancelSaveMate({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return mateService.cancelSave({ id, userId });
}
