import type { WithParams } from '@/app';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { notFound } from 'next/navigation';
import MateWriteForm from '../_components/MateWriteForm';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

export default async function MateWriteUpdatePage({ params }: WithParams) {
  const { mateId } = await params;
  if (!mateId) {
    notFound();
  }

  const mate = await commonErrorHandler(
    mateService.getDetails({
      id: mateId,
    }),
  );

  if (!mate) {
    notFound();
  }

  return (
    <main className="h-[calc(100dvh - 63px)] px-5 py-4">
      <MateWriteForm initialMate={mate} />
    </main>
  );
}
