import { MenuCard } from '../MenuCard';
interface menuProps {
  description?:string;
  images?:string[];
  name:string;
  price:number;
}

interface MenuListprops {
  title:string;
  menuLists: menuProps[];
}

export function MenuList({title,menuLists}:MenuListprops) {
  return (
    <div className="m-auto w-[95%] rounded-md bg-white">
      <div className="flex w-full items-center justify-between p-[14px]">
        <p className="text-[20px] font-bold">{title}</p>
        <a>수정하기</a>
      </div>
      <div className="w-full border-b-[0.6px] border-b-[#B1B1B1]" />
      {/* 메뉴 카드 리스트에만 높이와 스크롤 적용 */}
      <div className="max-h-56 overflow-y-auto">
        {menuLists.map((item,idx)=>(
          <div key={idx}>
            <MenuCard img={item.images} name={item.name} description={item.description} price={item.price} />
          </div> 
        ))}

      </div>
    </div>
  );
}

