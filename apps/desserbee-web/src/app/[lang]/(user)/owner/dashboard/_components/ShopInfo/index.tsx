import { ShopInfoCard } from '../ShopInfoCard';
import Link from 'next/link';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';
import Image from 'next/image';
import type { HolidaysItem, storeImage } from '@repo/entity/src/store';

const navigationService = new NavigationService({});
interface BreakTime {
  startTime: string;
  endTime: string;
}

interface OperatingHoursItem {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime?: string | null;
  isClosed?: boolean;
  breakTimes?: BreakTime[];
  regularClosureType?: string;
}

interface shopInfoProps {
  img?: storeImage[];
  name: string;
  phone: string;
  address: string;
  operatingTime: OperatingHoursItem[];
  sns?: string[];
  storeUuid: string;
  holidays?: HolidaysItem[];
}

function getServiceName(url: string) {
  if (url.includes('instagram.com')) return '인스타그램';
  if (url.includes('catchtable')) return '캐치테이블';
  if (url.includes('youtube.com')) return '유튜브';
  if (url.includes('facebook.com')) return '페이스북';
  if (url.includes('naver.com')) return '네이버';

  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain.split('.')[0];
  } catch {
    return url;
  }
}

export function ShopInfo(data: shopInfoProps) {
  const day = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="m-auto flex w-[95%] flex-col items-center justify-center rounded-md bg-white p-2">
      <div className="w-[95%]">
        {/* 사진 */}
        <div className="mx-auto mb-6 flex max-h-[400px] w-[80%] gap-3">
          {/* 왼쪽: 대표 사진 */}
          <div className="relative w-4/5 rounded-xl">
            {data.img && data.img[0] ? (
              <>
                <Image
                  src={data.img[0].url}
                  alt="대표 사진"
                  fill
                  className="rounded-xl object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
                <span className="absolute left-2 top-2 z-10 rounded-md bg-pink-400 px-3 py-1 text-sm font-bold text-white">
                  대표
                </span>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-300"></div>
            )}
          </div>
          {/* 오른쪽: 추가 사진 3개*/}
          <div className="flex w-1/5 flex-col gap-3">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="relative aspect-square w-full overflow-hidden rounded-xl"
              >
                {data.img && data.img[idx] ? (
                  <Image
                    src={data.img[idx].url}
                    alt={`추가 사진 ${idx}`}
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Link
          href={{
            pathname: navigationService.getHref(
              NavigationPathname.OwnerDashboardBasicInfo,
            ),
            query: { storeUuid: data.storeUuid },
          }}
          className="mx-auto mb-8 block w-[80%] rounded-md border border-[#949494] bg-[#F5F5F5] px-4 py-2 text-center text-black hover:bg-[#C9C9C9]"
        >
          가게 정보 수정
        </Link>

        <div>
          <p className="text-[20px] font-bold">{data.name}</p>
          <ShopInfoCard title="전화번호" content={data.phone} />
          <ShopInfoCard title="주소" content={data.address} />
          {/* 운영시간 */}
          <div className="flex w-full gap-2 py-2">
            <p className="w-[20%] text-[#4B4B4B]">운영시간</p>
            <div className="flex w-[80%] flex-col">
              {data.operatingTime.map((item, idx) => (
                <div key={item.dayOfWeek} className="mb-1">
                  <div className="flex items-center">
                    <span className="w-[10%] font-semibold">{day[idx]}</span>
                    <span>
                      {item.regularClosureType ? (
                        <span className="text-red-500">휴무</span>
                      ) : (
                        `${item.openingTime}~${item.closingTime}`
                      )}
                    </span>
                  </div>

                  {item.breakTimes && item.breakTimes.length > 0 && (
                    <div className="ml-[10%] flex w-full gap-2">
                      <p>{`${item.breakTimes[0].startTime}~${item.breakTimes[0].endTime}`}</p>
                      <p className="w-[30%]">브레이크타임</p>
                    </div>
                  )}
                  {item.lastOrderTime && (
                    <div className="ml-[10%] flex w-full gap-2">
                      <p>{`${item.lastOrderTime}`}</p>
                      <p className="w-[30%]">라스트오더</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* 휴무 */}
          <div className="flex w-full gap-2 py-2">
            <p className="w-[20%] text-[#4B4B4B]">휴무</p>
            <div className="flex flex-col">
              {data.holidays?.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <div>{item.date}</div>
                  <div>{item.reason}</div>
                </div>
              ))}
            </div>
          </div>
          {/* SNS */}
          <div className="flex w-full gap-2 py-2">
            <p className="w-[20%] text-[#4B4B4B]">SNS</p>
            {data.sns?.map((url, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-6 underline underline-offset-4"
              >
                {getServiceName(url)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
