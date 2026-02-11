"use client";

import { useRouter } from "next/navigation";

import { PostIdeaForm } from "@/components/post-idea-form";
import { createPostIdea } from "@/lib/api";
import { PostIdeaPayload } from "@/lib/types";

export default function NewPostIdeaPage() {
  const router = useRouter();

  const handleCreate = async (payload: PostIdeaPayload) => {
    const item = await createPostIdea(payload);
    router.push(`/post-ideas/${item.id}`);
  };

  return (
    <main className="stack">
      <section className="stack">
        <h1>New Post Idea</h1>
        <p className="muted">Capture a post concept and add hashtags in one flow.</p>
      </section>
      <PostIdeaForm mode="create" submitLabel="Create Post Idea" onSubmit={handleCreate} />
    </main>
  );
}
