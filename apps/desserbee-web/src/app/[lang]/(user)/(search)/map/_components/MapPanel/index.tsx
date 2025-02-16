import { IconSize } from '@repo/design-system/components/icons';

import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import IconTarget from '@repo/design-system/components/icons/IconTarget';
import IconPlus from '@repo/design-system/components/icons/IconPlus';
import IconMinus from '@repo/design-system/components/icons/IconMinus';

import { useState, type ChangeEvent } from 'react';

interface MapPanelProps {
  handleSideBarOpen: () => void;
}

export function MapPanel({ handleSideBarOpen }: MapPanelProps) {
  const [value, setValue] = useState(2.5);
  const [range] = useState({ min: 0, max: 5 });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const increment = () => {
    setValue((prev) => Math.min(prev + 1, range.max));
  };

  const decrement = () => {
    setValue((prev) => Math.max(prev - 1, range.min));
  };

  return (
    <div className="absolute w-[47px] aspect-square right-4 bottom-2 z-10 flex flex-col gap-2">
      <button
        onClick={handleSideBarOpen}
        className="flex justify-center items-center aspect-square rounded-sm bg-white"
      >
        <IconFlowerOutline size={IconSize.l} className="#6F6F6F" />
      </button>
      <button className="flex justify-center items-center aspect-square rounded-sm bg-white">
        <IconTarget size={IconSize.m} className="#6F6F6F" />
      </button>
      <div className="grid grid-rows-[0.3fr_2fr_0.3fr] bg-white rounded-sm">
        <button
          className="flex justify-center w-full py-[10px]"
          onClick={increment}
        >
          <IconPlus size={IconSize.xs} className="text-[#6F6F6F]" />
        </button>
        <div className="relative h-[200px] border-y-[0.26px] border-y-[#D2D2D2] flex justify-center">
          <input
            type="range"
            value={value}
            min={range.min}
            max={range.max}
            className="absolute appearance-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center -rotate-90
            [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-[6.08px] [&::-webkit-slider-runnable-track]:bg-[#BABABA] 
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20.86px] [&::-webkit-slider-thumb]:w-[8px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[#9FA3A2] [&::-webkit-slider-thumb]:border-[0.43px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:relative"
            onChange={handleChange}
          />
        </div>
        <button
          className="flex justify-center w-full py-[10px]"
          onClick={decrement}
        >
          <IconMinus size={IconSize.xs} className="text-[#6F6F6F]" />
        </button>
      </div>
    </div>
  );
}
