import type { OperatingHoursItem } from '@repo/entity/src/store';

interface OperationStatus {
  status: 'BEFORE_OPEN' | 'OPEN' | 'CLOSED' | 'DAY_OFF';
  isOpen: boolean;
  message: string;
}

export function getOperationStatus(
  operatingHours: OperatingHoursItem[],
): OperationStatus {
  const now = new Date();
  const kstNow = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const currentDay = kstNow
    .toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Seoul' })
    .toUpperCase();

  const todaySchedule = operatingHours.find(
    (schedule) => schedule.dayOfWeek === currentDay,
  );

  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      status: 'DAY_OFF',
      isOpen: false,
      message: '오늘은 휴무일입니다',
    };
  }

  const currentHour = kstNow.getHours();
  const currentMinute = kstNow.getMinutes();
  const currentTimeMinutes = currentHour * 60 + currentMinute;

  const [openHour, openMinute] = todaySchedule.openingTime
    .split(':')
    .map(Number);
  const [closeHour, closeMinute] = todaySchedule.closingTime
    .split(':')
    .map(Number);

  const openTimeMinutes = openHour * 60 + openMinute;
  const closeTimeMinutes = closeHour * 60 + closeMinute;

  if (currentTimeMinutes < openTimeMinutes) {
    return {
      status: 'BEFORE_OPEN',
      isOpen: false,
      message: `${todaySchedule.openingTime}에 영업 시작`,
    };
  }

  if (
    currentTimeMinutes >= openTimeMinutes &&
    currentTimeMinutes < closeTimeMinutes
  ) {
    return {
      status: 'OPEN',
      isOpen: true,
      message: `${todaySchedule.closingTime}에 영업 종료`,
    };
  }

  return {
    status: 'CLOSED',
    isOpen: false,
    message: '영업 종료',
  };
}
