"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { listPostIdeas } from "@/lib/api";
import { PLATFORMS, POST_STATUSES } from "@/lib/constants";
import { PostIdea } from "@/lib/types";

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function PostIdeasPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedStatus = searchParams.get("status") ?? "";
  const selectedPlatform = searchParams.get("platform") ?? "";

  const [items, setItems] = useState<PostIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    listPostIdeas({ status: selectedStatus || undefined, platform: selectedPlatform || undefined })
      .then((data) => {
        if (!cancelled) {
          setItems(data);
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          const message = requestError instanceof Error ? requestError.message : "Failed to load post ideas.";
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
  }, [selectedPlatform, selectedStatus]);

  const summaryLabel = useMemo(() => {
    if (loading) {
      return "Loading posts...";
    }
    return `${items.length} post idea${items.length === 1 ? "" : "s"}`;
  }, [items.length, loading]);

  const updateFilters = (next: { status?: string; platform?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.status !== undefined) {
      if (next.status) {
        params.set("status", next.status);
      } else {
        params.delete("status");
      }
    }

    if (next.platform !== undefined) {
      if (next.platform) {
        params.set("platform", next.platform);
      } else {
        params.delete("platform");
      }
    }

    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <main className="stack">
      <section className="hero-card stack hero-card--posts">
        <div className="hero-grid">
          <div className="stack">
            <h1>Post Ideas</h1>
            <p className="hero-caption">Track content from idea to published in one place.</p>
          </div>
          <span className="hero-stat hero-stat-emphasis">{summaryLabel}</span>
        </div>
        <div className="controls controls-filters">
          <label className="field-label">
            Filter by status
            <select value={selectedStatus} onChange={(event) => updateFilters({ status: event.target.value })}>
              <option value="">All statuses</option>
              {POST_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            Filter by platform
            <select value={selectedPlatform} onChange={(event) => updateFilters({ platform: event.target.value })}>
              <option value="">All platforms</option>
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="btn-row">
          <Link href="/new" className="btn btn-primary">
            Create New Post Idea
          </Link>
        </div>
        {error && <p className="muted ui-alert">{error}</p>}
      </section>

      <section className="list-grid">
        {!loading && items.length === 0 && (
          <article className="card item item-card">
            <h3>No ideas yet</h3>
            <p className="muted">Start by creating your first post idea.</p>
          </article>
        )}

        {items.map((postIdea) => (
          <Link
            key={postIdea.id}
            href={`/post-ideas/${postIdea.id}`}
            className="card item item-card item-card-link"
            aria-label={`Open post ${postIdea.id}: ${postIdea.title}`}
          >
            <div className="item-meta">
              <div className="btn-row">
                <span className="badge">{postIdea.platform}</span>
                <span className={`badge badge-status badge-status-${postIdea.status}`}>{postIdea.status}</span>
              </div>
              <span className="item-meta-id">Post #{postIdea.id}</span>
            </div>
            <div className="stack item-main">
              <h3>{postIdea.title}</h3>
              <p className="muted text-clamp">{postIdea.caption}</p>
            </div>
            <div className="item-meta-row">
              <span className="item-meta-chip">Scheduled: {formatDateTime(postIdea.scheduled_at)}</span>
              <span className="item-meta-chip">Updated: {formatDateTime(postIdea.updated_at)}</span>
            </div>
            <p className="muted item-hashtags text-clamp">{postIdea.hashtags || "No hashtags yet"}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
