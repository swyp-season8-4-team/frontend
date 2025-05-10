import ReadyBee from '@/assets/images/bee_icon_ready.png';
import { CustomModal } from '@repo/design-system/components/Modal/custom';
import Image from 'next/image';

interface PointIsNotReadyModalProps {
  onClose: () => void;
}

export function PointIsNotReadyModal({ onClose }: PointIsNotReadyModalProps) {
  return (
    <CustomModal
      onClose={onClose}
      className="my-[50px] flex aspect-square w-[214px] items-center justify-center text-nowrap p-5 md:w-[308px]"
    >
      <div className="flex flex-col items-center">
        <div className="md: w-[62px] md:w-[94px]">
          <div className="md: w-[62px] md:w-[94px]">
            <Image src={ReadyBee} alt="logo" />
          </div>
        </div>
        <div className="text-[14px] font-semibold md:text-[18px]">
          포인트 서비스는 아직 준비중입니다!
        </div>
      </div>
    </CustomModal>
  );
}
