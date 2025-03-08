import IconLeftArrow from '@repo/design-system/components/icons/IconLeftArrow';
import { useRouter } from 'next/navigation';
interface BookMarkHeaderProps {
  title: string;
}

export function BookMarkHeader({ title }: BookMarkHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center justify-start py-5 md:py-[34px] gap-[7px] md:gap-6"
    >
      <div className="w-[14px] md:w-[30px] h-[14px] md:h-[30px]">
        <IconLeftArrow className="text-[#6F6F6F] w-full h-full " />
      </div>
      <div className="font-semibold text-[14px] md:text-[30px]">{title}</div>
    </button>
  );
}
