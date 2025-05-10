import IconRetry from '@repo/design-system/components/icons/IconRetry';
interface RefetchStoreBtnProps {
  refetchStore: () => void;
  clearSelectedCategories: () => void;
}

export default function ReFetchStoreBtn({
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
      <div className="'shadow-base flex items-center gap-2 rounded-[24px] bg-white px-3 py-2 font-medium">
        <div className="h-4 w-4">
          <IconRetry className="h-full w-full text-[#3374ff]" />
        </div>
        <div className="semi-bold text-nowrap text-[#3374ff]">
          현 위치에서 새로고침
        </div>
      </div>
    </button>
  );
}
