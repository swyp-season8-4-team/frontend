import IconBee from '@repo/design-system/components/icons/IconBee';
import { CustomModal } from '@repo/design-system/components/Modal/custom';

interface PointIsNotReadyModalProps {
  onClose: () => void;
}

export function PointIsNotReadyModal({ onClose }: PointIsNotReadyModalProps) {
  return (
    <CustomModal
      onClose={onClose}
      className="text-nowrap flex justify-center items-center my-[50px] p-5 w-[214px] md:w-[308px] aspect-square"
    >
      <div className="flex flex-col items-center">
        <div className="w-[62px] md:w-[94px] md:">
          <IconBee className="w-full h-full" />
        </div>
        <div className="font-semibold text-[14px] md:text-[18px]">
          포인트 서비스는 아직 준비중입니다!
        </div>
      </div>
    </CustomModal>
  );
}
