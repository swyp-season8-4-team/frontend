/**
 * ISO 형식의 날짜 문자열을 'YYYY-MM-DD HH:MM' 형식으로 변환합니다.
 * @param dateString ISO 형식의 날짜 문자열 (예: '2025-02-25T12:09:09.261973')
 * @returns 포맷팅된 날짜 문자열 (예: '2025-02-25 12:09')
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // 년, 월, 일 가져오기
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    
    // 시간, 분 가져오기
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // 포맷팅된 문자열 반환
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '';
  }
}
