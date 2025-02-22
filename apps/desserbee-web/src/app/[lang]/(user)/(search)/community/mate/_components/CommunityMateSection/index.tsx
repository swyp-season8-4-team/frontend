import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import CommunityMateCard from '../CommunityMateCard';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
})

export default async function CommunityMateSection() {
  const { mates, isLast } = await mateService.getMateList({ from: 0, to: 10 });

  return (
    <section className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] space-y-4">
      {mates.map((mate) => {
        return (
          <CommunityMateCard
            key={mate.id}
            mate={mate}
          />
        )
      })}
    </section>
  )
}