import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { CommunityMateListProvider } from '../../_contexts/CommunityMateListContext';
import CommunityMateList from '../CommunityMateList';
import ScrollGradient from '../../../_components/ScrollGradient';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

interface Props {
  q: string | string[] | null;
}

export default async function CommunityMateSection({ q }: Props) {
  if (Array.isArray(q)) {
    throw new Error('q is not array');
  }

  const { mates, isLast } = await commonErrorHandler(
    mateService.getMateList({ from: 0, to: 9, ...(q && { keyword: q }) }),
  );

  return (
    <section className="relative flex-1 space-y-4 overflow-y-auto [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
      <CommunityMateListProvider initialIsLast={isLast} initialMates={mates}>
        <CommunityMateList />
      </CommunityMateListProvider>
    </section>
  );
}
