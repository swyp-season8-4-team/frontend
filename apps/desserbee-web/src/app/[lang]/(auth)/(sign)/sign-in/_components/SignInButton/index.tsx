'use client';

import { Button } from "@repo/ui/components/button";

interface Props {
  firstButtonText: string;
  secondButtonText?: string;
  onClickA?: () => void;
  onClickB?: () => void;
}

export default function SignInButtons({ firstButtonText, secondButtonText, onClickA, onClickB }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[320px]">
      <Button
        variant="default"
        className="flex w-full text-white text-[20px] font-bold leading-[130%] tracking-[-0.84px] text-center items-center py-[15px] rounded-[100px] bg-[#FFB700]"
        onClick={onClickA}
      >
        {firstButtonText}
      </Button>
      {!!secondButtonText && (
        <Button
          variant="default"
          className="flex w-full items-center py-[15px] rounded-[100px] bg-[#BABABA] text-[20px] font-bold leading-[130%] tracking-[-0.84px]"
          onClick={onClickB}
        >
          {secondButtonText}
        </Button>
      )}
    </div>
  );
}