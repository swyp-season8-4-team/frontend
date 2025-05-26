import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: '4월', value: 0 },
  { name: '5월', value: 40 },
  { name: '6월', value: 40 },
  { name: '7월', value: 60 },
  { name: '8월', value: 10 },
  { name: '9월', value: 100 },
  { name: '10월', value: 70 },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="linear" dataKey="value" stroke="#3ECA61" />
      </LineChart>
    </ResponsiveContainer>
  );
}
