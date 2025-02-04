import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <div className="bg-primary px-base w-full text-[22px]">
      <div className="mt-8 text-3xl text-white leading-10 -tracking-[3%]">
        디저비
      </div>
      {/* //TODO: placeHolder 페이지마다 다르게 */}
      <SearchBar placeHolder="지금 핫한 디저트를 검색해 보세요!" />
    </div>
  );
}
