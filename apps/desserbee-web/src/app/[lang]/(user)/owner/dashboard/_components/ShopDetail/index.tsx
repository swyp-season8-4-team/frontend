import IconCar from '@repo/design-system/components/icons/IconCar';
import IconDog from '@repo/design-system/components/icons/IconDog';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler';

interface tagProps {
  name: string;
}
interface detailProps {
  tags: tagProps[];
  description: string;
  animalYn?: boolean;
  tumblerYn?: boolean;
  parkingYn?: boolean;
}

const FEATURES = [
  {
    icon: <IconCar className="h-full w-full text-[#E06A00]" />, // 아이콘 예시
    title: '주차 가능',
  },
  {
    icon: <IconDog className="h-full w-full" />,
    title: '반려동물 동반',
  },
  {
    icon: <IconTumbler className="h-full w-full" />,
    title: '텀블러 할인',
  },
];

export function ShopDetail(data: detailProps) {
  const { tags, description, animalYn, tumblerYn, parkingYn } = data;
  const featureValues = [parkingYn, animalYn, tumblerYn];

  return (
    <div className="m-auto flex w-[95%] flex-col items-center justify-center rounded-md bg-white p-2">
      <div className="flex w-[95%] flex-col gap-6">
        <div>
          <p className="mb-2 text-[#4B4B4B]">가게 특성 태그</p>
          <div className="flex gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="text-m w-fit rounded-[3px] border-[0.3px] border-[#A6A6A6] bg-white px-2 py-1"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[#4B4B4B]">한 줄 소개</p>
          <div className="text-m rounded-[6px] border-[0.4px] border-[#A6A6A6] bg-white px-2 py-1">
            {description}
          </div>
        </div>

        <div className='w-full'>
          <p className="mb-2 text-[#4B4B4B]">기타 정보</p>
          <div className="flex gap-7">
            {FEATURES.map((feature, idx) =>
              featureValues[idx] ? (
                <div key={feature.title} className='w-[90px]'>
                  <div>{feature.icon}</div>
                  <p className="text-center">{feature.title}</p>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
