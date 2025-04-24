import { MenuCard } from '../MenuCard';

interface MenuListprops {
  title: string;
}
export function MenuList({ title }: MenuListprops) {
  return (
    <div className="m-auto w-[95%] rounded-md bg-white">
      <div className="flex w-full items-center justify-between p-[14px]">
        <p className="text-[20px] font-bold">{title}</p>
        <a>수정하기</a>
      </div>
      <div className="w-full border-b-[0.6px] border-b-[#B1B1B1]" />
      {/* 메뉴 카드 리스트에만 높이와 스크롤 적용 */}
      <div className="h-56 overflow-y-auto">
        <MenuCard name="쪽파베이글" description="상세설명" price="7,500" />
        <MenuCard name="쪽파베이글" description="상세설명" price="7,500" />
        <MenuCard name="쪽파베이글" description="상세설명" price="7,500" />
        <MenuCard name="쪽파베이글" description="상세설명" price="7,500" />
      </div>
    </div>
  );
}

