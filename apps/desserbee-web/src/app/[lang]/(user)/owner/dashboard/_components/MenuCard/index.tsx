export interface MenuCardProps {
  img?: string;
  name: string;
  description: string;
  price: string;
}
export function MenuCard({ img, name, description, price }: MenuCardProps) {
  return (
    <div className="flex gap-2 p-3 border-b-[0.6px] border-b-[#E9E9F1]">
      <div className="w-1/4">사진</div>
      <div className="w-4/5">
        <p className="text-xl font-semibold">{name}</p>
        <p className="truncate w-full">{description}</p>
        <p>
          <span className="font-semibold">{price}</span>
          <span> 원</span>
        </p>
      </div>
    </div>
  );
}
