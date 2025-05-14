import type { getCouponResponse } from '@repo/entity/src/store';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import CouponForm from '../CouponForm';
import { PortalContext } from '@repo/ui/contexts/PortalContext';

type CouponCardProps = {
  coupon: getCouponResponse;
};

const couponTargetMap: Record<string, string> = {
  ALL: '모든 고객 대상',
  SUBSCRIBED: '알림받기한 고객',
  CUSTOM: '기타',
};

const weekMap: Record<string, string> = {
  SUNDAY: '일',
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
};

// 날짜 포맷팅
function formatDateTimeKorean(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hour}:${minute}`;
}
// 숫자 뒤의 00 제거
function formatTime(timeStr: string) {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const router = useRouter();
  const { push, pop } = useContext(PortalContext); // Portal을 사용해서 모달 열고 닫을 수 있음
  
  const handleCloseForm = () => { // 모달 닫기 핸들러 
    pop('modal');
  };

    // 카드 클릭 시 CouponForm을 모달로 띄움
  const handleCardClick = () => {
    push('modal', {
      component: (
        <CouponForm
          mode="edit"
          coupon={coupon}
          onClose={handleCloseForm}
        />
      ),
    });
  };

  return (
    <>
      <div
        className="relative mx-auto w-[90%] max-w-md cursor-pointer overflow-hidden rounded-2xl bg-white"
        onClick={handleCardClick}
      >
        {/* 점선 테두리와 배경 */}
        <div className="relative flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-6 pb-12 text-center">
          <div className="text-gray-700">
            <div className="text-nowrap">
              {couponTargetMap[coupon.target] || '기타'} /{' '}
              <span className="text-lg font-bold text-black">
                {coupon.name}
              </span>{' '}
              <span className="text-sm text-gray-500">
                (
                {coupon.quantity ? `총 ${coupon.quantity}장 발행` : '제한 없음'}
                )
              </span>
            </div>
            <br />
            <div>
              <p className="font-semibold">쿠폰 노출 기간</p>
              <span className="text-nowrap text-blue-900">
                {coupon.hasExposureDate
                  ? `${formatDateTimeKorean(coupon.exposureStartAt || '')} ~ ${formatDateTimeKorean(coupon.exposureEndAt || '')}`
                  : '상시노출'}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {coupon.condition.conditionType === 'AMOUNT' ? (
                <span>
                  {coupon.condition.minimumPurchaseAmount?.toLocaleString()}원
                  이상 구매시 사용가능
                </span>
              ) : coupon.condition.conditionType === 'TIME_DAY' ? (
                <>
                  <span>
                    {coupon.condition.conditionDays
                      ?.map((day) => weekMap[day])
                      .join(', ')}
                  </span>
                  <span>
                    {' '}
                    {formatTime(coupon.condition.conditionStartTime || '')}~
                    {formatTime(coupon.condition.conditionEndTime || '')} 사용
                    가능
                  </span>
                </>
              ) : coupon.condition.conditionType === 'EXCLUSIVE' ? (
                <span>쿠폰 단독 사용 불가능(다른 메뉴 주문시 사용 가능)</span>
              ) : coupon.condition.conditionType === 'CUSTOM' ? (
                <span>{coupon.condition.customConditionText}</span>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
