'use client'
import { useRouter } from 'next/navigation';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import CouponCard from './_components/CouponCard';

export default function CouponPage() {
  const router = useRouter();

  const registerCouponClick = () => {
    const url = `/owner/dashboard/coupon/register`;
    router.push(url);
  };

  return (
    <div className="h-screen bg-[#EBEBEB]">
      <DashBoardHeader title="쿠폰 등록하기" />
      <div className="flex flex-col gap-3">
        <CouponCard />
        <CouponCard />
        <CouponCard />
      </div>

      <button
        className="mx-auto mb-[5px] mt-3 block w-[90%] max-w-md rounded-[10px] border border-solid border-[#949494] bg-[#F5F5F5] px-4 py-2 hover:bg-[#C9C9C9]"
        onClick={registerCouponClick}
      >
        + 쿠폰 추가하기
      </button>
    </div>
  );
}
