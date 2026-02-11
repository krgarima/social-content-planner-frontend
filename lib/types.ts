export type Platform = "instagram" | "linkedin" | "x" | "tiktok" | "facebook";
export type PostStatus = "idea" | "draft" | "scheduled" | "published";

export interface PostIdea {
  id: number;
  platform: Platform;
  title: string;
  caption: string;
  status: PostStatus;
  scheduled_at: string | null;
  hashtags: string;
  created_at: string;
  updated_at: string;
}

export interface PostIdeaPayload {
  platform: Platform;
  title: string;
  caption: string;
  status: PostStatus;
  scheduled_at: string | null;
  hashtags: string;
}

export interface DashboardSummary {
  total_posts: number;
  by_status: Record<string, number>;
  by_platform: Record<string, number>;
  by_day: Record<string, number>;
}

export interface HashtagSuggestions {
  query: string;
  suggestions: string[];
}
