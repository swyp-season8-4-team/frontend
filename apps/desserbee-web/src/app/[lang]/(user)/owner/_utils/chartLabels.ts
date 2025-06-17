import { format } from 'date-fns';

// 2시간 단위 라벨 (00시 ~ 24시)
export function getDailyLabels(): string[] {
  return Array.from({ length: 13 }, (_, i) => `${String(i * 2).padStart(2, '0')}시`);
}

// 주간 라벨 (예: 6/9, 6/10 ...)
export function getWeeklyLabels(startDate: Date): string[] {
  return Array.from({ length: 7 }, (_, i) =>
    format(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i), 'M/d')
  );
}

// 월간 라벨 (1일 ~ N일)
export function getMonthlyLabels(year: number, month: number): string[] {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => `${i + 1}일`);
}
