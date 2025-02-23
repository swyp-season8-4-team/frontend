import { CustomModal } from '@repo/design-system/components/Modal/custom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BeforeDetailJoinNowModalProps {
  onClose: () => void;
  storeUuid: string;
}

export function BeforeDetailJoinNowModal({
  onClose,
  storeUuid,
}: BeforeDetailJoinNowModalProps) {
  const router = useRouter();

  const handleLaterBtnClick = () => {
    onClose();
    router.push(`/store/${storeUuid}`);
  };

  return (
    <CustomModal onClose={onClose}>
      <div>
        <div className="flex flex-col justify-center items-center px-3 md:px-[23px] pt-[60px] md:pt-20 pb-[18px] md:pb-[30px] md:w-[357px]">
          <div className="flex flex-col justify-center items-center md:mb-[35px] w-full h-full">
            <div className="md:text-[26px] text-lg leading-none">
              이 가게, 내 취향이랑 잘 맞을까?
            </div>
            <div className="mb-[15px] md:text-[26px] text-lg">
              회원가입하고 확인해보기!
            </div>
          </div>
          <div className="flex flex-col gap-[9.6px] md:gap-[13px] px-[13.2px] w-full">
            <Link
              onClick={onClose}
              href={'/sign-up'}
              className="bg-primary py-1 md:py-3 rounded-[100px] w-full text-white md:text-[22px] text-sm text-center"
            >
              회원가입하기
            </Link>
            <button
              onClick={handleLaterBtnClick}
              className="bg-primary py-1 md:py-3 rounded-[100px] w-full text-white md:text-[22px] text-sm text-center"
            >
              다음에 하기
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
