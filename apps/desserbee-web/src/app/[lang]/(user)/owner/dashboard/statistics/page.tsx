'use client';
import { useState } from 'react';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import DatePicker from 'react-datepicker';
import CustomButton from './_components/CustomCalendarButton';
import { ko } from 'date-fns/locale';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import VisitAnalysis from './_components/VisitAnalysis';

const TAB_LIST = [
  { label: '방문 분석', value: 'visit' },
  { label: '트렌드 파악', value: 'trend' },
  { label: '리뷰 유형', value: 'review' },
];

const periods = [
  { label: '일간', value: 'daily' },
  { label: '주간', value: 'weekly' },
  { label: '월간', value: 'monthly' },
];

function getFormattedPeriod(date: Date | null, period: string) {
  if (!date) return '';
  switch (period) {
    case 'daily':
      return format(date, 'yyyy.MM.dd', { locale: ko });
    case 'weekly': {
      // 주의 시작(월요일)과 끝(일요일) 구하기
      const weekStart = startOfWeek(date, { weekStartsOn: 1, locale: ko }); // 월요일 시작
      const weekEnd = endOfWeek(date, { weekStartsOn: 1, locale: ko }); // 일요일 끝
      return `${format(weekStart, 'yyyy.MM.dd', { locale: ko })} ~ ${format(weekEnd, 'yyyy.MM.dd', { locale: ko })}`;
    }
    case 'monthly':
      return format(date, 'yyyy.MM', { locale: ko });
    default:
      return '';
  }
}

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState('visit');
  const [activePeriod, setActivePeriod] = useState('daily');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashBoardHeader title="사장님 대시보드" />
      <div className="flex h-12 justify-center gap-10 border-b-2 border-t-2 border-b-[#EFEDEB] border-t-[#EFEDEB]">
        {TAB_LIST.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`transition-colors ${
              activeTab === tab.value
                ? 'border-b-2 border-b-[#DAA227] font-semibold text-[#5E4200]'
                : 'border-b-2 border-b-transparent font-semibold text-[#635F59]'
            } bg-white`}
            style={{ minWidth: '80px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-3 mt-6 flex justify-center gap-5 px-3">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setActivePeriod(period.value)}
            className={`transition-colors ${
              activePeriod === period.value ? 'bg-[#ffc858]' : 'bg-white'
            } h-12 w-24 border-2 border-[#E9E6DE] text-[#635F59] rounded-lg font-semibold`}
          >
            {period.label}
          </button>
        ))}

        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setOpen(false);
            }}
            customInput={<CustomButton />}
            open={open}
            onClickOutside={() => setOpen(false)}
            onInputClick={() => setOpen((prev) => !prev)}
            popperPlacement="bottom-start"
            locale={ko}
          />
        </div>
      </div>

      <div>
        {activeTab === 'visit' && (
          <VisitAnalysis
            period={activePeriod}
            date={selectedDate}
            formattedPeriod={getFormattedPeriod(selectedDate, activePeriod)}
          />
        )}
        {activeTab === 'trend' && <div>트렌드 파악 내용</div>}
        {activeTab === 'review' && <div>리뷰 유형 내용</div>}
      </div>
    </>
  );
}
