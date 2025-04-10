import BackButton from '@/app/[lang]/_components/BackButton';
import SearchIconButton from '../SearchIconButton';
import IconBookmark from '@repo/design-system/components/icons/IconBookmark';
interface DessertHeaderProps {
  title: string;
}
export function DessertHeader({ title }: DessertHeaderProps) {
  return (
    <header className="h-full w-full">
      <div className="bg-primary-80 flex max-h-[56px] w-full max-w-screen-md items-center justify-between px-[16px] py-4 text-[22px]">
        <BackButton />
        <div className="text-lg font-medium">{title}</div>

        <div className="flex items-center gap-1">
          {/* <IconBookmark className="text-transparent" /> */}
          <SearchIconButton />
        </div>
      </div>
    </header>
  );
}
