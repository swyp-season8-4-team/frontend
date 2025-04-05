'use server';

import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { revalidatePathAction } from '@/actions/revalidatePathAction';
import { RouteGroup } from '@repo/entity/src/navigation';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function createMateComment(params: {
  mateId: string;
  userId: string;
  content: string;
}) {
  try {
    await mateService.createReply({
      id: params.mateId,
      userId: params.userId,
      content: params.content,
    });

    await revalidatePathAction(RouteGroup.MateDetail, 'page');
    return { success: true };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { success: false, error };
  }
}
