'use client';
import { useEffect, useState } from 'react';
import Chart from '../Chart';
import StatisticsTitle from '../StatisticsTitle';
import type {
  getPeriodStatsResponse,
  getPeriodTrendStatsResponse,
} from '@repo/entity/src/store';
import {
  getPeriodStats,
  getPeriodTrendStats,
} from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { format } from 'date-fns';

interface VisitAnalysisProps {
  storeUuid: string;
  period: string;
  date: Date | null;
  formattedPeriod: string;
}
export default function VisitAnalysis(data: VisitAnalysisProps) {
  const { storeUuid, period, date, formattedPeriod } = data;
  const [stats, setStats] = useState<getPeriodStatsResponse | null>(null);
  const [trendStats, setTrendStats] = useState<
    getPeriodTrendStatsResponse[] | []
  >([]);
  const chartItems = [
    { title: '가게 상세 페이지 조회수', key: 'viewCount' },
    { title: '가게 저장 수', key: 'saveCount' },
    { title: '디저트 메이트 수', key: 'mateCount' },
  ];

  useEffect(() => {
    async function fetchStats() {
      if (storeUuid && period && date) {
        const statistics = await getPeriodStats({
          storeUuid,
          period: period as 'DAILY' | 'WEEKLY' | 'MONTHLY',
          date: format(date, 'yyyy-MM-dd'),
        });
        setStats(statistics);
      }
    }

    async function fetchTrendStats() {
      if (storeUuid && period && date) {
        const trendStatistics = await getPeriodTrendStats({
          storeUuid,
          period: period as 'DAILY' | 'WEEKLY' | 'MONTHLY',
          date: format(date, 'yyyy-MM-dd'),
        });
        setTrendStats(trendStatistics);
      }
    }
    fetchStats();
    fetchTrendStats();
  }, [storeUuid, period, date]);

  console.log(stats);
  console.log('추이:', trendStats);
  const updatedDate = date ? format(date, 'yyyy.MM.dd') : '';

  return (
    <>
      <div className="flex w-full justify-center text-nowrap">
        <div className="flex flex-col items-center border-r-2 border-r-[#EFEDEB] p-3">
          <p>전체 조회수</p>
          <p className="font-semibold">{stats?.totalViews}</p>
        </div>

        <div className="flex flex-col items-center border-r-2 border-r-[#EFEDEB] p-3">
          <p>전체 저장수</p>
          <p className="font-semibold">{stats?.totalSaves}</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3">
          <p>{formattedPeriod}</p>
          <p className="text-[#CDC8C3]">(업데이트 {updatedDate})</p>
        </div>
      </div>

      {chartItems.map((item, idx) => (
        <div key={item.key}>
          <StatisticsTitle title={item.title} />
          <Chart
            subject={item.key as 'viewCount' | 'saveCount' | 'mateCount'}
            period={period}
            trendStats={trendStats}
            date={date}
            formattedPeriod={formattedPeriod}
          />
        </div>
      ))}
    </>
  );
}
