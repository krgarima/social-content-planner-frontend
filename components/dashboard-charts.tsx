"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardChartsProps {
  statusData: Array<{ name: string; value: number }>;
  platformData: Array<{ name: string; value: number }>;
  dayData: Array<{ name: string; value: number }>;
}

export function DashboardCharts({ statusData, platformData, dayData }: DashboardChartsProps) {
  return (
    <div className="stack">
      <section className="card stack">
        <h2>Status Distribution</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} margin={{ top: 8, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#d85c30" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card stack">
        <h2>Platform Distribution</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformData} margin={{ top: 8, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1f8a4c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card stack">
        <h2>Posts Over Time</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dayData} margin={{ top: 8, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line dataKey="value" stroke="#1d1a16" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
