'use client';
import {
  getPeriodStats,
  getPeriodTrendStats,
} from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import type {
  getPeriodStatsResponse,
  getPeriodTrendStatsResponse,
} from '@repo/entity/src/store';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import StatisticsTitle from '../StatisticsTitle';
import Chart from '../Chart';

interface ReviewAnalysisProps {
  storeUuid: string;
  period: string;
  date: Date | null;
  formattedPeriod: string;
}
export default function ReviewAnalysis(data: ReviewAnalysisProps) {
  const { storeUuid, period, date, formattedPeriod } = data;
  const [stats, setStats] = useState<getPeriodStatsResponse | null>(null);
  const [trendStats, setTrendStats] = useState<
    getPeriodTrendStatsResponse[] | []
  >([]);

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

  const updatedDate = date ? format(date, 'yyyy.MM.dd') : '';

  return (
    <>
      <div className="flex w-full justify-center text-nowrap">
        <div className="flex flex-col items-center border-r-2 border-r-[#EFEDEB] px-5 py-3">
          <p>평균 평점</p>
          <div className="flex gap-2 font-semibold">
            <p className="text-[#FFC803]">★</p>
            <p>{Number(stats?.averageRating)} / 5</p>
          </div>
        </div>

        <div className="flex flex-col items-center border-r-2 border-r-[#EFEDEB] px-5 py-3">
          <p>리뷰 수</p>
          <p className="font-semibold">{stats?.totalReviewCount}</p>
        </div>

        <div className="flex flex-col items-center justify-center px-5 py-3">
          {period === 'DAILY' ? (
            <p>{formattedPeriod} (01-24시)</p>
          ) : (
            <p>{formattedPeriod}</p>
          )}

          <p className="text-[#CDC8C3]">(업데이트 {updatedDate})</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <StatisticsTitle title="리뷰 수 + 평점 추이" />
        <div className="flex gap-2">
          <div className="flex gap-1">
            <p className="text-[#3ECA61]">■</p>
            <p className="font-semibold text-[#635F59]">리뷰 수</p>
          </div>

          <div className="flex gap-1">
            <p className="text-[#544429]">■</p>
            <p className="font-semibold text-[#635F59]">평점 추이</p>
          </div>
        </div>
      </div>

      <Chart
        type="combined"
        period={period}
        trendStats={trendStats}
        date={date}
        formattedPeriod={formattedPeriod}
      />
    </>
  );
}
