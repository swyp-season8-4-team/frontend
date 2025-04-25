import { ShopInfoCard } from '../ShopInfoCard';
import Link from 'next/link';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';

const navigationService = new NavigationService({});

export function ShopInfo() {
  const data = [
    {
      storeId: 12,
      storeUuid: '4e8e1e28-c94e-40d7-8e93-6789abc45678',
      name: '디저트비 합정점',
      averageRating: 4.58,
      storeImages: [],
      ownerPickImages: ['string'],
      tags: ['케이크', '구움과자'],
      primaryStoreLink: 'https://instagram.com/dessertbee',
      storeLinks: ['https://link1.com', 'https://link2.com'],
      operatingHours: [
        {
          dayOfWeek: 'MONDAY',
          openingTime: '10:00',
          closingTime: '20:00',
          lastOrderTime: '19:30',
          isClosed: false,
          regularClosureType: 'MONTHLY',
          regularClosureWeeks: '1,3',
          breakTimes: [
            {
              startTime: '14:00',
              endTime: '15:00',
            },
          ],
        },
      ],
      holidays: [
        {
          date: '2025.01.01',
          reason: '신정',
        },
      ],
      topPreferences: [
        {
          tagId: 1,
          name: '비건',
          rank: 1,
        },
      ],
      address: '서울 마포구 양화로 23길 8',
      phone: '02-123-4567',
      description: '편안한 분위기의 감성 디저트 카페입니다.',
      animalYn: true,
      tumblerYn: false,
      parkingYn: true,
    },
  ];
  return (
    <div className="m-auto flex w-[95%] flex-col items-center justify-center rounded-md bg-white p-2">
      <div className="w-[95%]">
        <div className="mb-6 flex gap-2">
          <div className="w-4/5">사진</div>
          <div className="w-1/5 flex-col">
            <div>사진</div>
            <div>사진</div>
            <div>사진</div>
          </div>
        </div>
        <Link
          href={navigationService.getHref(
            NavigationPathname.OwnerDashboardBasicInfo,
          )}
          className="mb-8 block w-full rounded-md border border-[#949494] bg-[#F5F5F5] px-4 py-2 text-center text-black hover:bg-[#C9C9C9]"
        >
          가게 정보 수정
        </Link>

        <div>
          <p className="text-[20px] font-bold">{data[0].name}</p>
          <ShopInfoCard title="전화번호" content={data[0].phone} />
          <ShopInfoCard title="주소" content={data[0].address} />
          <ShopInfoCard
            title="운영시간"
            content={data[0].operatingHours[0].openingTime}
          />
          <ShopInfoCard title="SNS" content={data[0].phone} />
        </div>
      </div>
    </div>
  );
}
