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
} from 'recharts';
import {
  getDailyLabels,
  getMonthlyLabels,
  getWeeklyLabels,
} from '../../../../_utils/chartLabels';
import ChartDetail from '../ChartDetail';

interface ChartProps {
  title: string;
  subject: 'viewCount' | 'saveCount' | 'mateCount';
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

export default function Chart({
  title,
  subject,
  period,
  trendStats,
  date,
  formattedPeriod,
}: ChartProps) {
  let labels: string[] = [];

  // 일간 주간 월간별 라벨 구하기
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
  const weekDaysEng = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  if (period === 'DAILY') {
    data = labels.map((label) => {
      const hourStr = label.replace('시', '').padStart(2, '0') + ':00';
      const stat = trendStats.find((item) =>
        item.displayKey.startsWith(hourStr),
      );
      return { name: label, value: stat ? stat[subject] : 0 };
    });
  } else if (period === 'WEEKLY') {
    data = labels.map((label, idx) => {
      const engDay = weekDaysEng[idx];
      const stat = trendStats.find((item) => item.displayKey === engDay);
      return { name: label, value: stat ? stat[subject] : 0 };
    });
  } else if (period === 'MONTHLY') {
    data = labels.map((label) => {
      const stat = trendStats.find((item) => item.displayKey === label);
      return { name: label, value: stat ? stat[subject] : 0 };
    });
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
  const [selectedData, setSelectedData] = useState<{
    name: string;
    value: number;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  console.log(selectedData);

  return (
    <>
      <div className="h-[300px] w-full overflow-x-auto overflow-y-hidden">
        <div className="h-full min-w-[1200px]">
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
              <Line
                type="linear"
                dataKey="value"
                stroke="#3ECA61"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {selectedData && (
        <ChartDetail
          detailTitle={title}
          name={selectedData.name}
          value={selectedData.value}
        />
      )}
    </>
  );
}
