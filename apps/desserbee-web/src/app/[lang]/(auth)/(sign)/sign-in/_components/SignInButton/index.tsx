'use client';

import { Button } from '@repo/ui/components/button';

interface Props {
  firstButtonText: string;
  secondButtonText?: string;
  onClickA?: () => void;
  onClickB?: () => void;
}

export default function SignInButtons({
  firstButtonText,
  secondButtonText,
  onClickA,
  onClickB,
}: Props) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[320px]">
      <Button
        variant="default"
        className="flex w-full text-white text-[20px] font-bold leading-[130%] tracking-[-0.84px] text-center items-center py-[15px] rounded-[100px] bg-[#FFB700] hover:bg-[#FFB700]/90"
        onClick={onClickA}
      >
        {firstButtonText}
      </Button>
      {!!secondButtonText && (
        <Button
          variant="secondary"
          className="flex w-full text-white items-center py-[15px] rounded-[100px] bg-[#BABABA] hover:bg-[#BABABA]/90 text-[20px] font-bold leading-[130%] tracking-[-0.84px]"
          onClick={onClickB}
        >
          {secondButtonText}
        </Button>
      )}
    </div>
  );
}
