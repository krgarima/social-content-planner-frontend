"use client";

import { useEffect, useMemo, useState } from "react";

import { DashboardCharts } from "@/components/dashboard-charts";
import { getDashboardSummary } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";

function mapRecordToSeries(record: Record<string, number>) {
  return Object.entries(record).map(([name, value]) => ({ name, value }));
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getDashboardSummary()
      .then((data) => {
        if (!cancelled) {
          setSummary(data);
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          const message = requestError instanceof Error ? requestError.message : "Failed to load dashboard summary.";
          setError(message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const statusData = useMemo(() => mapRecordToSeries(summary?.by_status ?? {}), [summary?.by_status]);
  const platformData = useMemo(() => mapRecordToSeries(summary?.by_platform ?? {}), [summary?.by_platform]);
  const dayData = useMemo(() => mapRecordToSeries(summary?.by_day ?? {}), [summary?.by_day]);

  return (
    <main className="stack">
      <section className="hero-card stack">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <span className="dashboard-dot" aria-hidden="true" />
        </div>
        <p className="hero-caption">Reporting snapshot generated from live database data.</p>
        {loading && <p className="muted">Loading dashboard...</p>}
        {error && <p className="muted ui-alert">{error}</p>}
        {summary && (
          <div className="kpi-grid">
            <article className="kpi">
              <h3 className="kpi-label">Total Posts</h3>
              <p>{summary.total_posts}</p>
            </article>
            <article className="kpi">
              <h3 className="kpi-label">Statuses</h3>
              <p>{Object.keys(summary.by_status).length}</p>
            </article>
            <article className="kpi">
              <h3 className="kpi-label">Platforms</h3>
              <p>{Object.keys(summary.by_platform).length}</p>
            </article>
          </div>
        )}
      </section>

      {summary && <DashboardCharts statusData={statusData} platformData={platformData} dayData={dayData} />}
    </main>
  );
}
