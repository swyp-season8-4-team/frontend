export function ShopDetail() {
  return (
    <div className="m-auto flex w-[95%] flex-col items-center justify-center rounded-md bg-white p-2">
      <div className="w-[95%] flex flex-col gap-6">
        <div>
          <p className="mb-2 text-[#4B4B4B]">가게 특성 태그</p>
          <div className="flex gap-2">
            <div className="text-m w-fit rounded-[3px] border-[0.3px] border-[#A6A6A6] bg-white px-2 py-1">
              베이글
            </div>
            <div className="text-m w-fit rounded-[3px] border-[0.3px] border-[#A6A6A6] bg-white px-2 py-1">
              파르페
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[#4B4B4B]">한 줄 소개</p>
          <div className="text-m rounded-[6px] border-[0.4px] border-[#A6A6A6] bg-white px-2 py-1">
            다정한 스텝과 방금 나온 베이글, 그리고 따뜻한 수프가 기다리는 가장
            가까운 런던 속 베이글 뮤지엄. 국내 어디에서도 맛볼 수 없었던
            베이글의 식감과 무드를 선보입니다.
          </div>
        </div>

        <div>
          <p className="mb-2 text-[#4B4B4B]">기타 정보</p>
        </div>
      </div>
    </div>
  );
}
