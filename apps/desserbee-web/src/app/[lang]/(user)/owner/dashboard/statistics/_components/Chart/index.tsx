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

const data = [
  { name: '4월', value: 0 },
  { name: '5월', value: 40 },
  { name: '6월', value: 40 },
  { name: '7월', value: 60 },
  { name: '8월', value: 10 },
  { name: '9월', value: 100 },
  { name: '10월', value: 70 },
];

// 커스텀 커서 타입 정의
interface CustomCursorProps {
  points?: { x: number; y: number }[];
  width?: number;
  height?: number;
}

const CHART_MARGIN = { top: 5, right: 5, left: 5, bottom: 5 };

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

export default function Chart() {
  return (
    <div className="h-[300px] w-full p-2">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis />
          <Tooltip formatter={(value) => [value]} cursor={<CustomCursor />} />
          <Line type="linear" dataKey="value" stroke="#3ECA61" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
