import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { CommunityMateListProvider } from '../../_contexts/CommunityMateListContext';
import CommunityMateList from '../CommunityMateList';
import ScrollGradient from '../../../_components/ScrollGradient';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
})

interface Props {
  q: string | string[] | null;
}

export default async function CommunityMateSection({ q }: Props) {
  if (Array.isArray(q)) {
    throw new Error('q is not array');
  }
  
  const { mates, isLast } = await mateService.getMateList({ from: 0, to: 9, ...(q && { keyword: q }) });

  return (
    <section className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] space-y-4">
      <CommunityMateListProvider initialIsLast={isLast} initialMates={mates}>
        <CommunityMateList />
      </CommunityMateListProvider>
      {mates.length > 0 && <ScrollGradient />}
    </section>
  )
}