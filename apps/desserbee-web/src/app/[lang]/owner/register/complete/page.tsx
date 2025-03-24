'use client';

import { useEffect } from 'react';
import { useRegister } from '../_contexts/RegisterContext';

export default function RegisterCompletePage() {
  const { setIsFormDirty, updateBasicInfo } = useRegister();

  // 폼 입력 시작 시 dirty 상태로 설정
  const handleInputChange = () => {
    // setIsFormDirty(true);
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  return (
    <form onChange={handleInputChange}>
      <input type="text" />
    </form>
  );
}
