import IconBee from '@repo/design-system/components/icons/IconBee';
import { CustomModal } from '@repo/design-system/components/Modal/custom';

interface CommunityIsNotReadyModal {
  onClose: () => void;
}

export function CommunityIsNotReadyModal({
  onClose,
}: CommunityIsNotReadyModal) {
  return (
    <CustomModal
      onClose={onClose}
      className="flex justify-center items-center my-[50px] w-[214px] md:w-[308px] aspect-square"
    >
      <div className="flex flex-col items-center">
        <div className="w-[62px] md:w-[94px] md:">
          <IconBee className="w-full h-full" />
        </div>
        <div className="font-semibold text-[14px] md:text-[18px]">
          커뮤니티 리뷰는 아직 준비중입니다!
        </div>
      </div>
    </CustomModal>
  );
}
