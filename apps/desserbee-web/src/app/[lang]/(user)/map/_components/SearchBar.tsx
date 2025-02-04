import Image from "next/image";
import searchIcon from "../_assets/svg/icon-search.svg";

interface SearchBarProps {
  placeHolder: string;
}
export function SearchBar({ placeHolder }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full text-[22px] rounded-[60px] px-[53px] py-[22px] mb-[14px] mt-[18px] "
        placeholder={placeHolder}
      />
      <Image
        width={22}
        height={23}
        src={searchIcon}
        className="absolute top-[53%] -translate-y-1/2 l left-6"
        alt="search-icon"
      />
    </div>
  );
}
