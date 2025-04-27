import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';
import Image from 'next/image';
import Link from 'next/link';

interface StoreCardProps {
  img?: string;
  name: string;
  tag: string[];
  description: string;
  storeUuid: string;
  onClick?: () => void;
}
const navigationService = new NavigationService({});
export default function StoreCard({
  name,
  tag,
  description,
  img,
  storeUuid
}: StoreCardProps) {
  return (
    <Link
      href={{
        pathname: navigationService.getHref(NavigationPathname.OwnerDashboard),
        query: { storeUuid: storeUuid },
      }}
    >
      <div className="m-auto h-[40vh] w-[95%] cursor-pointer">
        <div className="relative h-[80%] w-full rounded-md">
          {img ? (
            <Image
              src={img}
              alt={`${name} 이미지`}
              fill
              sizes="100vw"
              className="rounded-md object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200">
              사진 없음
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="p-1 text-[20px] font-bold">{name}</p>
          <div>
            {tag.map((item, idx) => (
              <span key={idx} className="mr-1 text-[#424242]">
                {item}
                {idx !== tag.length - 1 && ','}
              </span>
            ))}
          </div>
        </div>
        <p className="w-full truncate p-1 text-[#424242]">{description}</p>
      </div>
    </Link>
  );
}
