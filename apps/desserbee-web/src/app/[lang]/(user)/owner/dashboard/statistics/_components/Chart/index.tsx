'use client';
import type { getPeriodTrendStatsResponse } from '@repo/entity/src/store';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts';
import {
  getDailyLabels,
  getMonthlyLabels,
  getWeeklyLabels,
} from '../../../../_utils/chartLabels';
import ChartDetail from '../ChartDetail';

interface ChartProps {
  type?: 'line' | 'bar' | 'combined';
  title?: string;
  subject?: 'viewCount' | 'saveCount' | 'mateCount';
  period: string;
  trendStats: getPeriodTrendStatsResponse[] | [];
  date: Date | null;
  formattedPeriod: string;
}

// 커스텀 커서 타입 정의
interface CustomCursorProps {
  points?: { x: number; y: number }[];
  width?: number;
  height?: number;
}

// e: 이벤트 정보 객체 타입 정의
type ChartMouseEvent = {
  activeTooltipIndex?: number;
  activeLabel?: string;
};

const CHART_MARGIN = { top: 5, right: 5, left: 5, bottom: 5 };
const weekDaysEng = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
// chart type 이 line 일 때 label 과 데이터 매핑
function getSingleChartData({
  period,
  labels,
  trendStats,
  subject,
}: {
  period: string;
  labels: string[];
  trendStats: getPeriodTrendStatsResponse[];
  subject: keyof getPeriodTrendStatsResponse;
}) {
  if (period === 'DAILY') {
    return labels.map((label) => {
      const hourStr = label.replace('시', '').padStart(2, '0') + ':00';
      const stat = trendStats.find((item) =>
        item.displayKey.startsWith(hourStr),
      );
      return {
        name: label,
        value: stat && subject ? Number(stat[subject]) : 0,
      };
    });
  } else if (period === 'WEEKLY') {
    return labels.map((label, idx) => {
      const engDay = weekDaysEng[idx];
      const stat = trendStats.find((item) => item.displayKey === engDay);
      return {
        name: label,
        value: stat && subject ? Number(stat[subject]) : 0,
      };
    });
  } else if (period === 'MONTHLY') {
    return labels.map((label) => {
      const stat = trendStats.find((item) => item.displayKey === label);
      return {
        name: label,
        value: stat && subject ? Number(stat[subject]) : 0,
      };
    });
  }
  return [];
}

// chart type 이 combined 일 때 label 과 데이터 매핑
function getCombinedChartData({
  period,
  labels,
  trendStats,
}: {
  period: string;
  labels: string[];
  trendStats: getPeriodTrendStatsResponse[];
}) {
  if (period === 'DAILY') {
    return labels.map((label) => {
      const hourStr = label.replace('시', '').padStart(2, '0') + ':00';
      const stat = trendStats.find((item) =>
        item.displayKey.startsWith(hourStr),
      );
      return {
        name: label,
        totalReviewCount: stat ? stat.totalReviewCount : 0,
        averageRating: stat ? stat.averageRating : 0,
      };
    });
  } else if (period === 'WEEKLY') {
    return labels.map((label, idx) => {
      const engDay = weekDaysEng[idx];
      const stat = trendStats.find((item) => item.displayKey === engDay);
      return {
        name: label,
        totalReviewCount: stat ? stat.totalReviewCount : 0,
        averageRating: stat ? stat.averageRating : 0,
      };
    });
  } else if (period === 'MONTHLY') {
    return labels.map((label) => {
      const stat = trendStats.find((item) => item.displayKey === label);
      return {
        name: label,
        totalReviewCount: stat ? stat.totalReviewCount : 0,
        averageRating: stat ? stat.averageRating : 0,
      };
    });
  }
  return [];
}

export default function Chart({
  type,
  title,
  subject,
  period,
  trendStats,
  date,
  formattedPeriod,
}: ChartProps) {
  
  // 일간 주간 월간별 라벨 구하기
  let labels: string[] = [];
  if (period === 'DAILY') {
    labels = getDailyLabels();
  } else if (period === 'WEEKLY' && date) {
    const [start] = formattedPeriod.split('~');
    const [year, month, day] = start.split('.').map(Number);
    labels = getWeeklyLabels(new Date(year, month - 1, day));
  } else if (period === 'MONTHLY' && date) {
    labels = getMonthlyLabels(date.getFullYear(), date.getMonth());
  }

  // 일간 주간 월간별 데이터 매핑
  let data: { name: string; value: number }[] = [];
  let combinedData: {
    name: string;
    totalReviewCount: number;
    averageRating: number;
  }[] = [];

  if (type === 'line' && subject) {
    data = getSingleChartData({ period, labels, trendStats, subject });
  }
  if (type === 'combined') {
    combinedData = getCombinedChartData({ period, labels, trendStats });
  }

  // 그래프 cursor 가 올라갔을 때 배경
  const CustomCursor: React.FC<CustomCursorProps> = ({
    points,
    width = 0,
    height = 0,
  }) => {
    if (!points || points.length === 0) return null;

    const barWidth =
      (width - CHART_MARGIN.left - CHART_MARGIN.right) / data.length / 2;
    return (
      <rect
        x={points[0].x - barWidth / 2}
        y={CHART_MARGIN.top}
        width={barWidth}
        height={height}
        fill="rgba(60, 220, 130, 0.15)"
        pointerEvents="none"
      />
    );
  };
  
  // 클릭했을 때 데이터 저장
  const [selectedData, setSelectedData] = useState<{
    name: string;
    value: number;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="h-[300px] w-full overflow-x-auto overflow-y-hidden">
        <div className="h-full min-w-[1200px]">
          {type === 'line' && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 16, left: 16, bottom: 5 }}
                onMouseMove={(e: ChartMouseEvent) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    setHoveredIndex(e.activeTooltipIndex);
                  }
                }}
                onClick={() => {
                  if (hoveredIndex !== null) {
                    setSelectedData(data[hoveredIndex]);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} interval={0} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value]}
                  cursor={<CustomCursor />}
                />
                <Line type="linear" dataKey="value" stroke="#3ECA61" />
              </LineChart>
            </ResponsiveContainer>
          )}

          {type === 'combined' && (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={combinedData}
                margin={{ top: 5, right: 16, left: 16, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} interval={0} />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="totalReviewCount"
                  fill="#3ECA61"
                  name="리뷰 수"
                  barSize={40}
                />
                <Line
                  yAxisId="right"
                  dataKey="averageRating"
                  stroke="#635F59"
                  name="평점 추이"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      {selectedData && (
        <ChartDetail
          detailTitle={title || ''}
          name={selectedData.name}
          value={selectedData.value}
        />
      )}
    </>
  );
}
