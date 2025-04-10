import IconBee from '@repo/design-system/components/icons/IconBee';
import { CustomModal } from '@repo/design-system/components/Modal/custom';
import Link from 'next/link';

interface NeedLoginModalProps {
  onClose: () => void;
}

export function NeedLoginModal({ onClose }: NeedLoginModalProps) {
  return (
    <CustomModal
      onClose={onClose}
      className="flex justify-center items-center my-[50px] p-5 w-[214px] md:w-[308px] aspect-square"
    >
      <div className="flex flex-col items-center">
        <div className="w-[62px] md:w-[94px]">
          <IconBee className="w-full h-full" />
        </div>
        <div className="font-semibold text-[14px] md:text-base">
          로그인이 필요한 서비스입니다.
        </div>
        <Link
          onClick={onClose}
          href={'/sign-in'}
          className="bg-primary rounded-[100px] w-full p-1 text-white text-[14px] md:text-base text-center"
        >
          로그인 하기
        </Link>
      </div>
    </CustomModal>
  );
}
