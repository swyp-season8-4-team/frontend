'use client';
import Image from 'next/image';
import { BookMarkHeader } from './BookMarkHeader';

import mapImg from '../_assets/svg/map.svg';
import houseImg from '../_assets/svg/house.svg';
import beeImg from '../_assets/svg/bee.svg';
import type { Mate } from '@repo/entity/src/mate';
interface BookMarkListContainerProps {
  savedDessertMate: Mate[];
}
export function BookMarkListContainer({
  savedDessertMate,
}: BookMarkListContainerProps) {
  return (
    <div>
      <BookMarkHeader title="저장 목록" />
      <div className="flex flex-col gap-6 md:gap-[61px]">
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] md:text-[22px] font-semibold">
            저장한 가게
          </div>
          <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
            {Array.from([1, 2, 3, 4]).map((store) => (
              <div
                key={store}
                className="bg-[#D9D9D9] rounded-[4.01px] w-full aspect-square flex justify-center items-center"
              >
                <div className="w-1/2">
                  <Image
                    src={mapImg}
                    alt="저장한 가게"
                    className="w-full h-full object-cover rounded-[4.01px]"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <button className="text-[10px] md:text-lg">더보기</button>
          </div>
        </div>
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] md:text-[22px] font-semibold">
            저장한 리뷰
          </div>
          <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
            {Array.from([1, 2, 3, 4]).map((store) => (
              <div
                key={store}
                className="bg-[#D9D9D9] rounded-[4.01px] w-full aspect-square flex justify-center items-center"
              >
                <div className="w-1/2">
                  <Image
                    src={houseImg}
                    alt="저장한 리뷰"
                    className="w-full h-full object-cover rounded-[4.01px]"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <button className="text-[10px] md:text-lg">더보기</button>
          </div>
        </div>
        <div className="flex flex-col gap-[7.25px] md:gap-[14px]">
          <div className="text-[10px] md:text-[22px] font-semibold">
            저장한 디저트 메이트
          </div>
          <div className="grid grid-cols-4 gap-[6.42px] md:gap-4">
            {Array.from([1, 2, 3, 4]).map((mate) => (
              <div
                // key={mate.id}
                key={mate}
                className="bg-[#D9D9D9] rounded-[4.01px] w-full aspect-square flex justify-center items-center"
              >
                <div className="w-1/2">
                  <Image
                    src={beeImg}
                    alt="저장한 디저트 메이트"
                    className="w-full h-full object-cover rounded-[4.01px]"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <button className="text-[10px] md:text-lg">더보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
