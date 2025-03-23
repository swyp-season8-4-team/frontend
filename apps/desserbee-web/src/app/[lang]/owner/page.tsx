import { Header } from '@repo/design-system/components/Header';
import { recipeKorea } from '@/app/fonts';

export default function OwnerHomePage() {
  return (
    <div className="bg-page flex flex-col w-full h-full">
      <Header title="디저비" fontClass={recipeKorea.className} />
      <div className="px-[54px] pt-[86px]">
        <div className="text-3xl font-semibold">
          <div>디저비에 오신 사장님! 환영합니다.</div>
          <div>지금 부터 내 가게를 관리해볼까요?</div>
        </div>
        <div className="flex-shrink-0 flex-1 w-full h-full flex flex-col justify-center items-center"></div>
      </div>
    </div>
  );
}
