'use client';
import NavigationService from '@repo/usecase/src/navigationService';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import NoticeCard from './_components/NoticeCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { useEffect, useState } from 'react';
import type { NoticeListResponse } from '@repo/entity/src/store';
import { getNoticeList } from '../../../(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
export default function Notices() {
  const router = useRouter();
  const navigationService = new NavigationService({});
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const [notices, setNotices] = useState<NoticeListResponse[]>([]);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const noticeList = await getNoticeList({ storeUuid: storeUuid! });
        setNotices(noticeList);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    }

    if (storeUuid) {
      fetchNotices();
    }
  }, [storeUuid]);

  return (
    <div className="min-h-screen w-full bg-[#EBEBEB]">
      <DashBoardHeader title="공지 관리하기" />
      <button
        onClick={() =>
          router.push(
            navigationService.getHref(NavigationPathname.OwnerRegisterNotice) +
              `?storeUuid=${storeUuid}`,
          )
        }
        className="mx-auto mb-[5px] block w-[95%] rounded-[10px] border border-solid border-[#949494] bg-[#F5F5F5] px-4 py-2 hover:bg-[#C9C9C9]"
      >
        + 새 공지 추가하기
      </button>

      <div className="m-auto flex h-full w-[95%] flex-col items-center justify-center rounded-md bg-white">
        <div className="flex w-full justify-between rounded-t-md bg-[#F5F5F5] p-2">
          <div className="flex gap-[6px]">
            <p className="font-bold">공지사항</p>
            <span className="font-bold">{notices.length}</span>
            <span>개</span>
          </div>
          <p className="text-[#767676]">최신순</p>
        </div>
        <div className="w-full px-2">
          {notices.length > 0 ? (
            notices.map((item, index) => (
              <NoticeCard
                key={item.noticeId}
                tag={item.tag}
                title={item.title}
                date={item.createdAt}
                noticeId={item.noticeId}
                storeId={storeUuid ?? ''}
              />
            ))
          ) : (
            <div className="py-12 text-center text-base text-gray-400">
              공지를 추가해주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
