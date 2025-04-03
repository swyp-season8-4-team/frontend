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

export const formatDateToHHMM = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '00:00';
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  } catch {
    return '00:00';
  }
};

export const formatDateToMMDD = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}.${day}`;
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '';
  }
};

/**
 * 주어진 날짜와 현재 시간의 차이를 상대적인 시간 문자열로 변환합니다.
 * ex) '방금 전', '5분 전', '3시간 전', '1일 전', '7일 전', '한달 전' 등
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 상대적 시간을 나타내는 문자열
 */
export function formatRelativeTime(dateString: string): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return '';
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor(diffInHour / 24);
    const diffInMonth = Math.floor(diffInDay / 30);
    const diffInYear = Math.floor(diffInMonth / 12);

    if (diffInSec < 60) {
      return '방금전';
    } else if (diffInMin < 60) {
      return `${diffInMin}분전`;
    } else if (diffInHour < 24) {
      return `${diffInHour}시간전`;
    } else if (diffInDay < 7) {
      return `${diffInDay}일전`;
    } else if (diffInDay < 30) {
      return `${Math.floor(diffInDay / 7)}주전`;
    } else if (diffInMonth < 12) {
      return `${diffInMonth}달전`;
    } else {
      return `${diffInYear}년전`;
    }
  } catch (error) {
    console.error('상대 시간 포맷팅 오류:', error);
    return '';
  }
}

type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun';

type DayMap = {
  [key in DayKey]: string;
};

export function convertDayToKorean(englishDay: string): string {
  // 입력값을 소문자로 변환하여 대소문자 구분 없이 처리
  const day = englishDay.toLowerCase();

  // 영어 요일과 한글 요일 매핑
  const dayMap: DayMap = {
    monday: '월',
    tuesday: '화',
    wednesday: '수',
    thursday: '목',
    friday: '금',
    saturday: '토',
    sunday: '일',
    // 약어 지원
    mon: '월',
    tue: '화',
    wed: '수',
    thu: '목',
    fri: '금',
    sat: '토',
    sun: '일',
  };

  // 매핑된 한글 요일 반환, 없으면 오류 메시지 반환
  return day in dayMap
    ? dayMap[day as DayKey]
    : '올바른 영어 요일을 입력해주세요.';
}
