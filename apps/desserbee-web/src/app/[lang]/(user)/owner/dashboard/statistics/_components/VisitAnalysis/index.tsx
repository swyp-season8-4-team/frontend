'use client'
import { useEffect, useState } from "react";
import Chart from "../Chart";
import StatisticsTitle from "../StatisticsTitle";
import type { getPeriodStatsResponse } from "@repo/entity/src/store";
import { getPeriodStats } from "@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action";

interface VisitAnalysisProps {
  storeUuid:string;
  period: string;
  date: Date | null;
  formattedPeriod: string;
}
export default function VisitAnalysis(data: VisitAnalysisProps) {
  const {storeUuid, period, date, formattedPeriod} =data;
  const [stats,setStats] = useState<getPeriodStatsResponse|null>(null);
  
  useEffect(() => {
    async function fetchStats(){
      if(storeUuid && period && date){
        const statistics = await getPeriodStats({storeUuid,
          period: period as 'DAILY' | 'WEEKLY' | 'MONTHLY',
          date:date.toISOString().slice(0,10),
        });
        setStats(statistics);
      }
    }
    fetchStats();
  },[storeUuid, period,date]);

  console.log(stats);

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
          <p>(업데이트 2025.04.29)</p>
        </div>
      </div>
  
      <StatisticsTitle title="가게 상세 페이지 조회수"/>
      <Chart />
      <StatisticsTitle title="가게 저장 수"/>
      <Chart />
      <StatisticsTitle title="디저트 메이트 수"/> 
      <Chart />
    </>
  );
}
