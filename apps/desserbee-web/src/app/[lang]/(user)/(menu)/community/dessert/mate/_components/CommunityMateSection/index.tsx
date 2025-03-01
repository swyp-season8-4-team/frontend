import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { CommunityMateProvider } from '../../_contexts/CommunityMateContext';
import CommunityMateList from '../CommunityMateList';

const mateService = new MateService({
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
    <CommunityMateProvider initialIsLast={isLast} initialMates={mates}>
      <CommunityMateList />
    </CommunityMateProvider>
  )
}