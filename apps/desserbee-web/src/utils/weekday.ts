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
