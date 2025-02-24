import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { CommunityMateProvider } from '../../_contexts/CommunityMateContext';
import CommunityMateList from '../CommunityMateList';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
})

export default async function CommunityMateSection() {
  const { mates, isLast } = await mateService.getMateList({ from: 0, to: 9 });

  return (
    <CommunityMateProvider initialIsLast={isLast} initialMates={mates}>
      <CommunityMateList />
    </CommunityMateProvider>
  )
}