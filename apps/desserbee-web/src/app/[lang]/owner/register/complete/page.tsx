'use client';

import { useEffect } from 'react';

export default function RegisterCompletePage() {
  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  return (
    <form className="mx-auto max-w-md p-4">
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          지도로 이동
        </button>
      </div>
    </form>
  );
}
