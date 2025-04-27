import IconRetry from '@repo/design-system/components/icons/IconRetry';
interface RefetchStoreBtnProps {
  refetchStore: () => void;
  clearSelectedCategories: () => void;
}

export function ReFetchStoreBtn({
  refetchStore,
  clearSelectedCategories,
}: RefetchStoreBtnProps) {
  return (
    <button
      className="rounded-base absolute bottom-4 left-1/2 z-10 -translate-x-1/2 md:bottom-4 md:p-2"
      onClick={() => {
        refetchStore();
        clearSelectedCategories();
      }}
    >
      <div className="shadow-base flex items-center gap-1 rounded-[24px] bg-white p-2 md:gap-2 md:px-3 md:py-2">
        <div className="h-3 w-3 md:h-4 md:w-4">
          <IconRetry className="h-full w-full text-xs text-[#3374ff] md:text-lg" />
        </div>
        <div className="semi-bold text-nowrap text-xs text-[#3374ff] md:text-lg">
          현 위치에서 새로고침
        </div>
      </div>
    </button>
  );
}
