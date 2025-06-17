'use client';
import { useState } from 'react';
import { DashBoardHeader } from '../_components/DashBoardHeader';
import DatePicker from 'react-datepicker';
import CustomButton from './_components/CustomCalendarButton';
import { ko } from 'date-fns/locale';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import VisitAnalysis from './_components/VisitAnalysis';
import { useSearchParams } from 'next/navigation';
import WeeklyPicker from './_components/WeeklyPicker';

const TAB_LIST = [
  { label: '방문 분석', value: 'visit' },
  { label: '트렌드 파악', value: 'trend' },
  { label: '리뷰 유형', value: 'review' },
];

const periods = [
  { label: '일간', value: 'DAILY' },
  { label: '주간', value: 'WEEKLY' },
  { label: '월간', value: 'MONTHLY' },
];

function getFormattedPeriod(date: Date | null, period: string) {
  if (!date) return '';
  switch (period) {
    case 'DAILY':
      return format(date, 'yyyy.MM.dd', { locale: ko });
    case 'WEEKLY': {
      const weekStart = startOfWeek(date, { weekStartsOn: 1, locale: ko }); // 월요일 시작
      const weekEnd = endOfWeek(date, { weekStartsOn: 1, locale: ko }); // 일요일 끝
      return `${format(weekStart, 'yyyy.MM.dd', { locale: ko })} ~ ${format(weekEnd, 'yyyy.MM.dd', { locale: ko })}`;
    }
    case 'MONTHLY':
      return format(date, 'yyyy.MM', { locale: ko });
    default:
      return '';
  }
}

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState('visit');
  const [activePeriod, setActivePeriod] = useState('DAILY');

  const today = new Date();
  const [baseDate, setBaseDate] = useState<Date>(new Date());

  const selectedWeek = {
    //baseDate 가 속한 주의 월요일 날짜를 반환
    start: startOfWeek(baseDate, { weekStartsOn: 1, locale: ko }),
    //baseDate 가 속한 주의 일요일 날짜를 반환
    end: endOfWeek(baseDate, { weekStartsOn: 1, locale: ko }),
  };

  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');

  return (
    <div>
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

      <div className="mb-3 mt-6 flex justify-center gap-2 px-3">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setActivePeriod(period.value)}
            className={`transition-colors ${
              activePeriod === period.value ? 'bg-[#ffc858]' : 'bg-white'
            } h-12 w-24 rounded-lg border-2 border-[#E9E6DE] font-semibold text-[#635F59]`}
          >
            {period.label}
          </button>
        ))}

        <div>
          {activePeriod === 'DAILY' && (
            <DatePicker
              selected={baseDate}
              onChange={(date) => {
                if (date) setBaseDate(date);
                setOpen(false);
              }}
              customInput={<CustomButton />}
              open={open}
              onClickOutside={() => setOpen(false)}
              onInputClick={() => setOpen((prev) => !prev)}
              popperPlacement="bottom-start"
              maxDate={today}
              locale={ko}
            />
          )}

          {activePeriod === 'WEEKLY' && (
            <WeeklyPicker
              selectedDate={baseDate}
              value={selectedWeek}
              onChange={(range, pickedDate) => setBaseDate(pickedDate)}
            />
          )}

          {activePeriod === 'MONTHLY' && (
            <DatePicker
              selected={
                new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
              }
              onChange={(date) => {
                if (date) setBaseDate(date);
              }}
              dateFormat="yyyy.MM"
              showMonthYearPicker
              customInput={<CustomButton />}
              open={open}
              onClickOutside={() => setOpen(false)}
              onInputClick={() => setOpen((prev) => !prev)}
              popperPlacement="bottom-start"
              locale={ko}
              placeholderText="월 선택"
              maxDate={today}
            />
          )}
        </div>
      </div>

      <div>
        {activeTab === 'visit' && (
          <VisitAnalysis
            storeUuid={storeUuid || ''}
            period={activePeriod}
            date={baseDate}
            formattedPeriod={getFormattedPeriod(baseDate, activePeriod)}
          />
        )}
        {activeTab === 'trend' && <div>트렌드 파악 내용</div>}
        {activeTab === 'review' && <div>리뷰 유형 내용</div>}
      </div>
    </div>
  );
}
