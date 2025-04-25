import { ShopInfo } from './_components/ShopInfo';
import { ShopDetail } from './_components/ShopDetail';
import { Notice } from './_components/Notice';
import { MenuList } from './_components/MenuList';
import { DashBoardHeader } from './_components/DashBoardHeader';

export default function DashBoardHomePage() {
  return (
    <div className="h-full bg-[#EBEBEB]">
      <DashBoardHeader title="기본 정보 관리하기" />
      <div className="flex flex-col gap-4">
        <ShopInfo />
        <ShopDetail />
        <MenuList title="메뉴리스트" />
        <Notice
          title="최근 공지"
          content="런던 베이글 뮤지엄 안국점 현장대기 및 원격줄서기는 캐치테이블을 이용부탁드립니다🌼 많은 관심과 이용부탁드립니다💚"
        />
      </div>
    </div>
  );
}
