'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import CouponCard from './_components/CouponCard';
import { useContext, useEffect, useState } from 'react';
import type { getCouponResponse } from '@repo/entity/src/store';
import { getCoupon } from '../../../(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import CouponForm from './_components/CouponForm';

export default function CouponPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const [coupons, setCoupons] = useState<getCouponResponse[]>([]);
  const { push, pop } = useContext(PortalContext);

  async function fetchCoupons() {
    try {
      const coupons = await getCoupon({ storeUuid: storeUuid! });
      setCoupons(coupons);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseForm = () => {
    pop('modal');
  };

  const handleRegisterSuccess = () => {
    fetchCoupons();
  };

  const registerCouponClick = () => {
    push('modal', {
      component: (
        <CouponForm
          mode="create"
          onClose={handleCloseForm}
          onSuccess={handleRegisterSuccess}
        />
      ),
    });
  };

  useEffect(() => {
    if (storeUuid) fetchCoupons();
  }, [storeUuid]);

  return (
    <div className="min-h-screen bg-[#EBEBEB]">
      <DashBoardHeader title="쿠폰 등록하기" />
      <div className="flex flex-col gap-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.couponId} coupon={coupon} />
        ))}
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
