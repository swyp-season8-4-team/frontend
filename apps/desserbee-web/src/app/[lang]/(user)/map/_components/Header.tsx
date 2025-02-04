import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <div className="bg-primary w-full px-base text-[22px]">
      <div className="text-3xl text-white leading-10 -tracking-[3%] mt-8">
        디저비
      </div>
      <SearchBar placeHolder="지금 핫한 디저트를 검색해 보세요!" />
    </div>
  );
}
