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

const axisLine = { stroke: "var(--line-strong)" };
const tick = { fill: "var(--muted)", fontSize: 12 };
const tooltipContentStyle = {
  border: "1px solid var(--line)",
  borderRadius: 10,
  backgroundColor: "rgba(255, 253, 248, 0.98)",
  boxShadow: "0 8px 22px rgba(35, 26, 14, 0.12)",
};
const tooltipLabelStyle = { color: "var(--ink-soft)", fontWeight: 700 };
const tooltipItemStyle = { color: "var(--ink)" };
const legendStyle = { color: "var(--muted)", fontSize: 12 };

export function DashboardCharts({ statusData, platformData, dayData }: DashboardChartsProps) {
  return (
    <div className="stack chart-stack">
      <section className="card stack chart-card">
        <div className="stack chart-head">
          <h2>Status Distribution</h2>
          <p className="muted">Compare where ideas currently sit in the workflow.</p>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} margin={{ top: 8, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={axisLine} tick={tick} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={axisLine} tick={tick} />
              <Tooltip
                cursor={{ fill: "rgba(184, 91, 52, 0.1)" }}
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Bar dataKey="value" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card stack chart-card">
        <div className="stack chart-head">
          <h2>Platform Distribution</h2>
          <p className="muted">See how content is spread across social channels.</p>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformData} margin={{ top: 8, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={axisLine} tick={tick} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={axisLine} tick={tick} />
              <Tooltip
                cursor={{ fill: "var(--chart-platform-cursor)" }}
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Bar dataKey="value" fill="var(--chart-platform)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card stack chart-card">
        <div className="stack chart-head">
          <h2>Posts Over Time</h2>
          <p className="muted">Track publishing velocity from recent daily activity.</p>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dayData} margin={{ top: 8, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={axisLine} tick={tick} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={axisLine} tick={tick} />
              <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
              <Line dataKey="value" stroke="var(--ink)" strokeWidth={2.4} dot={false} activeDot={{ r: 4, fill: "var(--accent)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
