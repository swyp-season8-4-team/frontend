import { CustomModal } from '@repo/design-system/components/Modal/custom';
import Link from 'next/link';

interface MyPreferNotSignInModalProps {
  onClose: () => void;
}

export function MyPreferNotSignInModal({
  onClose,
}: MyPreferNotSignInModalProps) {
  return (
    <CustomModal onClose={onClose}>
      <div className="flex flex-col justify-center items-center p-5 w-[200px] md:w-[357px] min-w-fit h-[180px] md:h-[298px]">
        <div className="flex flex-col justify-center items-center md:gap-3 w-full h-full">
          <div className="md:text-[26px]">취향 선택은 회원가입 후</div>
          <div className="md:text-[26px]">사용 가능해요!</div>
        </div>
        <Link
          href={'/sign-up'}
          onClick={onClose}
          className="bg-primary py-1 md:py-3 rounded-[100px] w-full text-white md:text-[22px] text-center"
        >
          회원가입하기
        </Link>
      </div>
    </CustomModal>
  );
}
