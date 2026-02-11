"use client";

import { FormEvent, useMemo, useState } from "react";

import { getHashtagSuggestions } from "@/lib/api";
import { PLATFORMS, POST_STATUSES } from "@/lib/constants";
import { PostIdea, PostIdeaPayload } from "@/lib/types";

type FormMode = "create" | "edit";

interface PostIdeaFormProps {
  mode: FormMode;
  initialValue?: PostIdea;
  submitLabel: string;
  onSubmit: (payload: PostIdeaPayload) => Promise<void>;
}

function toDateTimeLocal(value: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetMs = date.getTimezoneOffset() * 60_000;
  const local = new Date(date.getTime() - offsetMs);
  return local.toISOString().slice(0, 16);
}

export function PostIdeaForm({ mode, initialValue, submitLabel, onSubmit }: PostIdeaFormProps) {
  const [platform, setPlatform] = useState<PostIdeaPayload["platform"]>(initialValue?.platform ?? "instagram");
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [caption, setCaption] = useState(initialValue?.caption ?? "");
  const [status, setStatus] = useState<PostIdeaPayload["status"]>(initialValue?.status ?? "idea");
  const [scheduledAt, setScheduledAt] = useState(toDateTimeLocal(initialValue?.scheduled_at ?? null));
  const [hashtags, setHashtags] = useState(initialValue?.hashtags ?? "");
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedHashtags = useMemo(
    () => hashtags.split(",").map((item) => item.trim()).filter(Boolean),
    [hashtags],
  );

  const addHashtag = (tag: string) => {
    const cleaned = tag.trim();
    if (!cleaned) {
      return;
    }

    const next = new Set(normalizedHashtags);
    next.add(cleaned);
    setHashtags(Array.from(next).join(", "));
  };

  const handleSuggestionLookup = async () => {
    const query = keyword.trim();
    if (query.length < 2) {
      setError("Enter at least 2 characters to fetch hashtag suggestions.");
      return;
    }

    setLoadingSuggestions(true);
    setError(null);
    try {
      const response = await getHashtagSuggestions(query);
      setSuggestions(response.suggestions);
    } catch (lookupError) {
      const message = lookupError instanceof Error ? lookupError.message : "Failed to load suggestions.";
      setError(message);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload: PostIdeaPayload = {
      platform,
      title: title.trim(),
      caption: caption.trim(),
      status,
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      hashtags: hashtags.trim(),
    };

    try {
      await onSubmit(payload);
      if (mode === "create") {
        setKeyword("");
        setSuggestions([]);
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Failed to save post idea.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="controls">
        <label>
          Platform
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value as PostIdeaPayload["platform"])}
            required
          >
            {PLATFORMS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as PostIdeaPayload["status"])}
            required
          >
            {POST_STATUSES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Title
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={3}
          maxLength={200}
          required
        />
      </label>

      <label>
        Caption
        <textarea value={caption} onChange={(event) => setCaption(event.target.value)} minLength={3} required />
      </label>

      <label>
        Schedule (optional)
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(event) => setScheduledAt(event.target.value)}
        />
      </label>

      <label>
        Hashtags (comma-separated)
        <input value={hashtags} onChange={(event) => setHashtags(event.target.value)} placeholder="#content, #marketing" />
      </label>

      <div className="stack hashtag-box">
        <strong>Hashtag Assistant</strong>
        <div className="btn-row">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Try: travel, startup, fitness"
          />
          <button className="btn btn-ghost" type="button" onClick={handleSuggestionLookup} disabled={loadingSuggestions}>
            {loadingSuggestions ? "Loading..." : "Suggest"}
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="chip-row">
            {suggestions.map((tag) => (
              <button key={tag} type="button" className="chip" onClick={() => addHashtag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="muted">{error}</p>}

      <div className="btn-row">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
