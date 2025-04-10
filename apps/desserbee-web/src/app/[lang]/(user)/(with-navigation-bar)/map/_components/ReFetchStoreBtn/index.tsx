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
      className="z-10 absolute bottom-4 md:bottom-4 -translate-x-1/2 left-1/2 md:p-2 rounded-base"
      onClick={() => {
        refetchStore();
        clearSelectedCategories();
      }}
    >
      <div className="shadow-base px-1 py-1 md:px-3 md:py-2 rounded-[24px] bg-white flex items-center gap-1 md:gap-2">
        <div className="w-3 h-3 md:w-4 md:h-4">
          <IconRetry className="w-full h-full text-[#3374ff] text-xs md:text-lg" />
        </div>
        <div className="text-[#3374ff] text-nowrap semi-bold text-xs md:text-lg">
          현 위치에서 새로고침
        </div>
      </div>
    </button>
  );
}
