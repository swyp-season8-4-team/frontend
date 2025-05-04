import Image from 'next/image';

export interface MenuCardProps {
  img?: string[];
  name: string;
  description?: string;
  price: number;
  isDelete?: boolean;
}
export function MenuCard({
  img,
  name,
  description,
  price,
  isDelete,
}: MenuCardProps) {
  return (
    <div className="flex min-h-[60px] items-center gap-2 border-b-[0.6px] border-b-[#E9E9F1] p-3">
      <div className="relative h-20 w-20 flex-shrink-0">
        {img ? (
          <Image
            src={img[0]}
            alt={name}
            fill
            className="rounded-md object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200 text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex h-20 w-full flex-col justify-center pl-2">
        <p className="text-xl font-semibold">{name}</p>
        <p className="w-full truncate">{description}</p>
        <p>
          <span className="font-semibold">{price.toLocaleString()}</span>
          <span> 원</span>
        </p>
      </div>
      {isDelete && (
        <div className="flex h-[60px] flex-col items-start">
          <button
            className="text-xl text-[#9F9F9F] hover:text-[#7A7A7A]"
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
