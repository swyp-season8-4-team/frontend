import { CustomModal } from '@repo/design-system/components/Modal/custom';

export function ReviewNotReadyModal({ onClose }: { onClose: () => void }) {
  return (
    <CustomModal
      onClose={onClose}
      className="flex justify-center items-center my-[50px] p-5 w-[200px] md:w-[357px] min-w-fit h-[180px] md:h-[298px]"
    >
      <div className="flex flex-col items-center">
        <div className="mb-1 md:mb-4 md:text-[26px]">디저트 리뷰는</div>
        <div className="md:text-[26px]">아직 준비중이에요!</div>
      </div>
    </CustomModal>
  );
}
