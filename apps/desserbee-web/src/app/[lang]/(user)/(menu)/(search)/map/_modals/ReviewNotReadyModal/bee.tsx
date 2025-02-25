import IconBee from '@repo/design-system/components/icons/IconBee';
import { CustomModal } from '@repo/design-system/components/Modal/custom';

interface CouponIsNotReadyModalProps {
  onClose: () => void;
}

export function ReviewNotReadyModal({ onClose }: CouponIsNotReadyModalProps) {
  return (
    <CustomModal
      onClose={onClose}
      className="flex justify-center items-center my-[50px] p-5 w-[214px] md:w-[308px] aspect-square"
    >
      <div className="flex flex-col items-center">
        <div className="w-[62px] md:w-[94px] md:">
          <IconBee className="w-full h-full" />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-semibold text-[14px] md:text-[18px]">
            디저트 리뷰는
          </div>
          <div className="font-semibold text-[14px] md:text-[18px]">
            아직 준비중이에요!
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
