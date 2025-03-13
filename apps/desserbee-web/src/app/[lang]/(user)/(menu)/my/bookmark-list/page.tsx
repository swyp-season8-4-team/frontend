import { BookMarkListContainer } from './_components/BookMarkListContainer';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

export default async function MyBookmarkListPage() {
  const { mates, last } = await mateService.getSavedMateList({
    from: 0,
    to: 4,
  });

  return <BookMarkListContainer initialMates={mates} initialIsLast={last} />;
}
