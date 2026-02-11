"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { PostIdeaForm } from "@/components/post-idea-form";
import { deletePostIdea, getPostIdea, updatePostIdea } from "@/lib/api";
import { PostIdea, PostIdeaPayload } from "@/lib/types";

export default function PostIdeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = useMemo(() => Number(params.id), [params.id]);

  const [item, setItem] = useState<PostIdea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(id) || id < 1) {
      setError("Invalid post idea id.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getPostIdea(id)
      .then((data) => {
        if (!cancelled) {
          setItem(data);
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          const message = requestError instanceof Error ? requestError.message : "Failed to load post idea.";
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
  }, [id]);

  const handleUpdate = async (payload: PostIdeaPayload) => {
    const updated = await updatePostIdea(id, payload);
    setItem(updated);
  };

  const handleDelete = async () => {
    if (!item) {
      return;
    }

    setDeleting(true);
    setError(null);
    try {
      await deletePostIdea(item.id);
      router.push("/");
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Failed to delete post idea.";
      setError(message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="stack">
      <section className="card stack">
        <div className="btn-row">
          <Link href="/" className="btn btn-ghost">
            Back to Posts
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={!item || deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
        {loading && <p className="muted">Loading post idea...</p>}
        {error && <p className="muted">{error}</p>}
      </section>

      {item && (
        <>
          <section className="stack">
            <h1>Edit Post Idea #{item.id}</h1>
            <p className="muted">Update fields, then save your changes.</p>
          </section>
          <PostIdeaForm mode="edit" initialValue={item} submitLabel="Save Changes" onSubmit={handleUpdate} />
        </>
      )}
    </main>
  );
}
