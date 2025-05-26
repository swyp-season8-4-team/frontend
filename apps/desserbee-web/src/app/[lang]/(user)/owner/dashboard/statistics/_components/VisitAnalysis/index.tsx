import Chart from "../Chart";
import StatisticsTitle from "../StatisticsTitle";

interface VisitAnalysisProps {
  period: string;
  date: Date | null;
  formattedPeriod: string;
}
export default function VisitAnalysis({ formattedPeriod }: VisitAnalysisProps) {
  return (
    <>
      <div className="flex w-full justify-center gap-4  text-nowrap p-2">
        <div className="flex flex-col items-center">
          <p>상세 페이지 조회수</p>
          <p className="font-semibold">12,340</p>
        </div>

        <div className="flex flex-col items-center">
          <p>가게 저장 수</p>
          <p className="font-semibold">230</p>
        </div>

        <div className="flex flex-col items-center">
          <p>{formattedPeriod}</p>
          <p>(업데이트 2025.04.29)</p>
        </div>
      </div>
  
      <StatisticsTitle title="가게 상세 페이지 조회수"/>
      <Chart />
      <StatisticsTitle title="가게 저장 수"/>
      <StatisticsTitle title="디저트 메이트 수"/> 
    </>
  );
}
