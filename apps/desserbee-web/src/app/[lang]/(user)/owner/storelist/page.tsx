import Link from 'next/link';
import { DashBoardHeader } from '../dashboard/_components/DashBoardHeader';
import StoreCard from './_components/StoreCard';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';

const navigationService = new NavigationService({});
export default function StoreList() {
  return (
    <div className="h-screen w-full bg-[#EBEBEB]">
      <DashBoardHeader title="내 가게 목록" num="3" />
      <div className="w-full">
        <StoreCard
          name="런던베이글 안국점"
          tag={['베이글', '케이크', '파르페']}
          description="다정한.."
        />
      </div>
      <Link
        href={navigationService.getHref(NavigationPathname.OwnerRegister)}
        className="mx-auto mb-[5px] block w-[95%] rounded-[10px] border border-solid border-[#949494] bg-[#F5F5F5] px-4 py-2 text-center hover:bg-[#C9C9C9]"
      >
        + 내 가게 추가하기
      </Link>
    </div>
  );
}
