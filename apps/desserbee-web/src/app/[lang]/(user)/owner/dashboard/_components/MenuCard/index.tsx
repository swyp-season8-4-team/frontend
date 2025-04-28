import Image from 'next/image';

export interface MenuCardProps {
  img?: string[];
  name: string;
  description?: string;
  price: number;
}
export function MenuCard({ img, name, description, price }: MenuCardProps) {
  return (
    <div className="flex min-h-[80px] items-center gap-2 border-b-[0.6px] border-b-[#E9E9F1] p-3">
      <div className="relative h-32 w-32 flex-shrink-0">
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
      <div className="pl-2 h-32 w-full">
        <p className="text-xl font-semibold">{name}</p>
        <p className="w-full truncate">{description}</p>
        <p>
          <span className="font-semibold">{price.toLocaleString()}</span>
          <span> 원</span>
        </p>
      </div>
    </div>
  );
}
