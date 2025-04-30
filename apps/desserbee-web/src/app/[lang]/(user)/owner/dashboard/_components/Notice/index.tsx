import { NavigationPathname } from '@repo/entity/src/navigation';
import Link from 'next/link';
import NavigationService from '@repo/usecase/src/navigationService';
import { formatDate } from '@repo/utility/src/date';

const navigationService = new NavigationService({});
interface NoticeProps {
  tag: string;
  title: string;
  content: string;
  createdAt: string;
}
interface props {
  title: string;
  notices: NoticeProps[];
  storeUuid: string;
}

export function Notice({ title, notices, storeUuid }: props) {
  return (
    <div className="m-auto mb-3 h-fit w-[95%] rounded-md bg-white">
      <div className="flex w-full items-center justify-between p-[14px]">
        <p className="text-[20px] font-bold">{title}</p>
        <Link
          href={{
            pathname: navigationService.getHref(
              NavigationPathname.OwnerDashboardNotices,
            ),
            query: { storeUuid: storeUuid },
          }}
          className="hover:font-bold"
        >
          수정하기
        </Link>
      </div>
      <div className="w-full border-b-[0.6px] border-b-[#B1B1B1]"></div>
      <div className="p-3">
        {notices.length > 0 && (
          <div>
            <p className="text-xl font-semibold">{notices[0].title}</p>
            <div className="flex gap-2 text-sm text-[#4B4B4B]">
              <p>등록일</p>
              <p>{formatDate(notices[0].createdAt)}</p>
            </div>
          </div>
        )}
        {notices.length > 0 ? notices[0].content : '최근 공지가 없습니다'}
      </div>
    </div>
  );
}
