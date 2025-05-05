export default function CouponCard(){
  return (
    <div className="relative mx-auto w-[90%] max-w-md overflow-hidden rounded-2xl bg-white cursor-pointer">
      {/* 점선 테두리와 배경 */}
      <div className="relative rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-6 pb-12 text-center">
        <div className="text-gray-700">
          모든 고객 대상 /{' '}
          <span className="text-lg font-bold text-black">
            3,000원 할인 쿠폰
          </span>{' '}
          <span className="text-sm text-gray-500">(총 100장 발행)</span>
          <br />
          쿠폰 노출 기간 :{' '}
          <span className="font-semibold text-blue-900">2025.04.01-05.01</span>
          <br />
          <span className="text-xs text-gray-500">
            *쿠폰 단독 사용 불가능 (다른 메뉴 주문시 사용 가능)
          </span>
        </div>
      </div>
    </div>
  );
}