import type { getPeriodTrendStatsResponse } from '@repo/entity/src/store';
import React from 'react';
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

interface ChartProps {
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

const CHART_MARGIN = { top: 5, right: 5, left: 5, bottom: 5 };

export default function Chart({
  subject,
  period,
  trendStats,
  date,
  formattedPeriod,
}: ChartProps) {
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

  const data = labels.map((label, idx) => ({
    name: label,
    value: trendStats[idx]?.[subject] ?? 0,
  }));

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

  return (
    <div className="h-[300px] w-full overflow-x-auto">
      <div className="h-full min-w-[1200px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ left: 15, right: 15}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              interval={0}
            />
            <YAxis />
            <Tooltip formatter={(value) => [value]} cursor={<CustomCursor />} />
            <Line type="linear" dataKey="value" stroke="#3ECA61" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
