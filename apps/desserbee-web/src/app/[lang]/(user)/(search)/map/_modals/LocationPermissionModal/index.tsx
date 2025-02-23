import { CustomModal } from '@repo/design-system/components/Modal/custom';

interface LocationPermissionModalProps {
  onClose: () => void;
}
export function LocationPermissionModal({
  onClose,
}: LocationPermissionModalProps) {
  return (
    <CustomModal onClose={onClose}>
      <div className=" bg-white px-4 md:px-8 py-[15px] md:py-[33px] border border-[#6F6F6F] rounded-[10px] w-[30%] md:w-[357px] min-w-fit h-[30%] md:h-[298px] text-nowrap">
        <div className="flex flex-col gap-5 md:gap-10">
          <div>
            <div className="font-semibold md:text-[22px] text-base">
              편리한 서비스 이용을 위한
            </div>
            <div className="font-semibold md:text-[22px] text-base">
              접근 권한 허용이 필요해요.
            </div>
          </div>
          <div>
            <div className="font-semibold md:text-5 text-sm">
              위치 정보 (필수)
            </div>
            <div className="md:text-5 text-sm">사용자 주변의 가게 추천</div>
          </div>
          <div>
            <div className="text-[#898989] text-xs md:text-base">
              서비스 제공에 위치 정보 접근 권한이 필요합니다.
            </div>
            <div className="text-[#898989] text-xs md:text-base">
              비허용시 서비스 이용에 제한됩니다.
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
