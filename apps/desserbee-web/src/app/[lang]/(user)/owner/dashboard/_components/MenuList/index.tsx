import Link from 'next/link';
import { MenuCard } from '../MenuCard';
import NavigationService from '@repo/usecase/src/navigationService';
import { NavigationPathname } from '@repo/entity/src/navigation';
interface menuProps {
  description?: string;
  images?: string[];
  name: string;
  price: number;
}

interface MenuListprops {
  title: string;
  storeUuid: string;
  menuLists: menuProps[];
}
const navigationService = new NavigationService({});
export function MenuList({ title, storeUuid, menuLists }: MenuListprops) {
  return (
    <div className="m-auto w-[95%] rounded-md bg-white">
      <div className="flex w-full items-center justify-between p-[14px]">
        <p className="text-[20px] font-bold">{title}</p>
        <Link
          href={{
            pathname: navigationService.getHref(
              NavigationPathname.OwnerMenuLists,
            ),
            query: { storeUuid: storeUuid },
          }}
          className='hover:font-bold'
        >
          수정하기
        </Link>
      </div>
      <div className="w-full border-b-[0.6px] border-b-[#B1B1B1]" />
      {/* 메뉴 카드 리스트에만 높이와 스크롤 적용 */}
      {menuLists.length > 0 ? (
        <div className="max-h-56 overflow-y-auto">
          {menuLists.map((item, idx) => (
            <div key={idx}>
              <MenuCard
                img={item.images}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='p-3'>메뉴가 없습니다</div>
      )}
    </div>
  );
}
