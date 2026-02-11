import { Suspense } from "react";

import { PostIdeasPageContent } from "@/components/post-ideas-page";

export default function PostIdeasPage() {
  return (
    <Suspense fallback={<main className="stack"><section className="card">Loading posts...</section></main>}>
      <PostIdeasPageContent />
    </Suspense>
  );
}
