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
  let closeTimeMinutes = closeHour * 60 + closeMinute;

  // 영업 종료 시간이 오픈 시간보다 작은 경우 (다음날까지 영업)
  if (closeTimeMinutes < openTimeMinutes) {
    closeTimeMinutes += 24 * 60; // 24시간을 더해줌
  }

  // 현재 시간이 자정을 넘었고, 오픈 시간 이전인 경우
  if (currentTimeMinutes < openTimeMinutes) {
    const yesterdayMinutes = currentTimeMinutes + 24 * 60;
    const yesterdayIndex =
      (operatingHours.findIndex(
        (schedule) => schedule.dayOfWeek === currentDay,
      ) -
        1 +
        7) %
      7;
    const yesterdaySchedule = operatingHours[yesterdayIndex];

    if (yesterdaySchedule && !yesterdaySchedule.isClosed) {
      const [yesterdayCloseHour, yesterdayCloseMinute] =
        yesterdaySchedule.closingTime.split(':').map(Number);
      let yesterdayCloseTimeMinutes =
        yesterdayCloseHour * 60 + yesterdayCloseMinute;

      if (yesterdayCloseTimeMinutes < openTimeMinutes) {
        yesterdayCloseTimeMinutes += 24 * 60;

        if (yesterdayMinutes < yesterdayCloseTimeMinutes) {
          return {
            status: 'OPEN',
            isOpen: true,
            message: `${yesterdaySchedule.closingTime}에 영업 종료`,
          };
        }
      }
    }
  }

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
