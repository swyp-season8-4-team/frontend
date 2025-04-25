import { NavigationPathname } from "@repo/entity/src/navigation";
import Link from "next/link";
import NavigationService from '@repo/usecase/src/navigationService';

const navigationService = new NavigationService({});

interface props {
  title: string;
  content:string;
}
export function Notice({ title, content}: props) {
  return (
    <div className="m-auto w-[95%] h-fit rounded-md bg-white mb-3">
      <div className="flex w-full justify-between items-center p-[14px]">
        <p className="text-[20px] font-bold">{title}</p>
        <Link
          href={navigationService.getHref(
            NavigationPathname.OwnerDashboardNotices,
          )}
          className="hover:font-bold"
        >
          수정하기
        </Link>
      </div>
      <div className="w-full border-b-[0.6px] border-b-[#B1B1B1]"></div>
      <div className="p-2">{content}</div>
    </div>
  );
}
