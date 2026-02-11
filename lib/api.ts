import { DashboardSummary, HashtagSuggestions, PostIdea, PostIdeaPayload } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function listPostIdeas(filters?: { status?: string; platform?: string }) {
  const params = new URLSearchParams();
  if (filters?.status) params.set("status", filters.status);
  if (filters?.platform) params.set("platform", filters.platform);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiRequest<PostIdea[]>(`/post-ideas${query}`);
}

export function getPostIdea(id: number) {
  return apiRequest<PostIdea>(`/post-ideas/${id}`);
}

export function createPostIdea(payload: PostIdeaPayload) {
  return apiRequest<PostIdea>("/post-ideas", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updatePostIdea(id: number, payload: Partial<PostIdeaPayload>) {
  return apiRequest<PostIdea>(`/post-ideas/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function replacePostIdea(id: number, payload: PostIdeaPayload) {
  return apiRequest<PostIdea>(`/post-ideas/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deletePostIdea(id: number) {
  return apiRequest<void>(`/post-ideas/${id}`, {
    method: "DELETE",
  });
}

export function getDashboardSummary() {
  return apiRequest<DashboardSummary>("/dashboard/summary");
}

export function getHashtagSuggestions(query: string) {
  const params = new URLSearchParams({ q: query });
  return apiRequest<HashtagSuggestions>(`/integrations/hashtags?${params.toString()}`);
}
