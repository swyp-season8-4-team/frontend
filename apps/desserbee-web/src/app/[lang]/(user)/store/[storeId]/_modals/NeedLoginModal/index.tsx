import ReadyBee from '@/assets/images/bee_icon_ready.png';
import { CustomModal } from '@repo/design-system/components/Modal/custom';
import Image from 'next/image';
import Link from 'next/link';

interface NeedLoginModalProps {
  onClose: () => void;
}

export function NeedLoginModal({ onClose }: NeedLoginModalProps) {
  return (
    <CustomModal
      onClose={onClose}
      className="my-[50px] flex aspect-square w-[214px] items-center justify-center p-5 md:w-[308px]"
    >
      <div className="flex flex-col items-center">
        <div className="md: w-[62px] md:w-[94px]">
          <Image src={ReadyBee} alt="logo" />
        </div>
        <div className="text-[14px] font-semibold md:text-base">
          로그인이 필요한 서비스입니다.
        </div>
        <Link
          onClick={onClose}
          href={'/sign-in'}
          className="bg-primary w-full rounded-[100px] p-1 text-center text-[14px] text-white md:text-base"
        >
          로그인 하기
        </Link>
      </div>
    </CustomModal>
  );
}
