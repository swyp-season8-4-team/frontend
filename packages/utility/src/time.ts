export function formatTimeTo12Hour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? '오후' : '오전';
  const adjustedHours = hours % 12 || 12; // 0시를 12시로 변환
  return `${period} ${adjustedHours}:${minutes.toString().padStart(2, '0')} `;
}
