import { Header } from '@repo/design-system/components/Header';
import { recipeKorea } from '@/app/fonts';
import { cn } from '@repo/ui/lib/utils';
import IconClipboard from '@repo/design-system/components/icons/IconClipboard';
import IconStore from '@repo/design-system/components/icons/IconStore';
import IconReport from '@repo/design-system/components/icons/IconReport';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';
import Link from 'next/link';

const navigationService = new NavigationService({});

const OWNER_NAVIGATIONS = [
  {
    index: '01.',
    title: '내 가게\n등록하기',
    description: '가게 이름, 대표사진 등을 등록해보세요.',
    icon: (
      <IconClipboard className="aspect-square h-[43.52px] w-[43.52px] md:h-[97px] md:w-[97px]" />
    ),
    path: navigationService.getHref(NavigationPathname.OwnerRegister),
  },
  // {
  //   index: '02.',
  //   title: '내 가게\n추가하기',
  //   description: '사장님의 새로운 가게를 추가해보세요.',
  //   icon: (
  //     <IconStore className="aspect-square h-[43.52px] w-[43.52px] md:h-[97px] md:w-[97px]" />
  //   ),
  //   path: '',
  // },
  // {
  //   index: '03.',
  //   title: '내 가게\n관리하기',
  //   description: '가게의 이벤트, 통계를 확인해보세요.',
  //   icon: (
  //     <IconReport className="aspect-square h-[43.52px] w-[43.52px] md:h-[97px] md:w-[97px]" />
  //   ),
  //   path: '',
  // },
];

export default function OwnerHomePage() {
  return (
    <div className="bg-page flex w-full flex-1 flex-col">
      <Header
        title="디저비"
        iconClass="w-[27px] md:w-[42.62px] md:h-[42.62px]"
        fontClass={cn(recipeKorea.className, 'text-lg md:text-3xl')}
      />
      <div className="mx-auto flex h-full w-full max-w-[768px] flex-1 justify-center">
        <div className="flex flex-1 flex-col items-center justify-center px-4 md:items-start md:justify-start md:px-[54px] md:pt-[86px]">
          <div className="mb-[13.78px] text-[14px] font-semibold md:mb-0 md:text-3xl">
            <div>디저비에 오신 사장님! 환영합니다.</div>
            <div>지금부터 내 가게를 관리해볼까요?</div>
          </div>
          <div className="flex w-full items-center justify-center md:flex-1">
            <div className="flex gap-1 md:gap-4">
              {OWNER_NAVIGATIONS.map(
                ({ index, title, description, icon, path }) => (
                  <Link
                    href={path}
                    key={index}
                    className="flex flex-col items-start rounded-[8.97px] border border-[#E8E8E8] bg-white px-[9px] py-[11px] md:rounded-[20px] md:px-[21px] md:py-[25px]"
                  >
                    <div className="mb-[9px] text-[9px] md:mb-4 md:text-[22px]">
                      {index}
                    </div>
                    <div className="mb-[9px] whitespace-pre-line text-start text-[13px] font-semibold md:mb-6 md:text-[28px]">
                      {title}
                    </div>
                    <div className="mb-[32.26px] text-start text-[8px] md:mb-[14px] md:text-lg">
                      {description}
                    </div>
                    <div className="flex w-full justify-end">{icon}</div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
