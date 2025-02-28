import IconRetry from '@repo/design-system/components/icons/IconRetry';
interface RefetchStoreBtnProps {
  refetchStore: () => void;
}

export function ReFetchStoreBtn({ refetchStore }: RefetchStoreBtnProps) {
  return (
    <button
      className="z-10 absolute bottom-1 md:bottom-4 -translate-x-1/2 left-1/2 px-[5px] md:p-2 rounded-base shadow-md bg-white"
      onClick={refetchStore}
    >
      <div className="flex items-center gap-1 md:gap-2">
        <div className="w-2 h-2 md:w-4 md:h-4">
          <IconRetry className="w-full h-full text-[#3374ff] text-[10px] md:text-base" />
        </div>
        <div className="text-[#3374ff] text-nowrap semi-bold text-[10px] md:text-base">
          새로 가게 불러오기
        </div>
      </div>
    </button>
  );
}
