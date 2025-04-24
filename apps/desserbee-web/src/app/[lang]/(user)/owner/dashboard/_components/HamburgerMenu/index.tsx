'use client';
import { useEffect } from 'react';
type HamburgerMenuProps = {
  onClose: () => void;
};

export function HamburgerMenu({ onClose }: HamburgerMenuProps) {
  const data = [
    "내 가게 홈",
    "기본 정보 관리",
    "운영 시간 관리",
    "메뉴 관리",
    "공지 관리",
    "쿠폰 등록",
    "통계 대시보드",
    "트렌드 리포트"
  ];

  // ESC 키로 닫기 (선택사항)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white bg-opacity-95">
      {/* 닫기 버튼 */}
      <div className="flex justify-end p-4">
        <button
          className="text-2xl text-[#9F9F9F] hover:text-[#7A7A7A]"
          aria-label="메뉴 닫기"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      {/* 메뉴 리스트 */}
      <nav className="flex-1 flex flex-col gap-2 px-6 text-[#6D6D6D]">
        {data.map((item, idx) => (
          <div
            key={item}
            className={`
              py-3 px-2 text-lg rounded cursor-pointer
              ${idx === 0 ? "bg-[#ededed] text-[#9F9F9F] font-semibold" : ""}
              hover:bg-[#f3f3f3] flex items-center
            `}
          >
            {item}
            {item === "트렌드 리포트" && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-xl bg-[#6C4CE3] text-white">유료</span>
            )}
          </div>
        ))}
      </nav>
      <div className="h-[28px] bg-[#EBEBEB] w-full mt-auto" />
    </div>
  );
}
