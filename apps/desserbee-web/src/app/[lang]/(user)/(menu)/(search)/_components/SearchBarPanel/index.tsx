import { DefaultPanel } from './default';

export function SearchBarPanel() {
  //TODO: DefaultPanel: 인기검색어, 최근검색어, 추후 연관검색어 Panel도 만들어야 함
  return (
    <div className="fixed top-[110px] left-1/2 -translate-x-1/2 right-0 bg-page h-full max-w-[768px] w-full">
      <DefaultPanel />
    </div>
  );
}
