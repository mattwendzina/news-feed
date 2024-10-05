import React from "react";
import { Post as PostType } from "@/types";
import Post from "./Post";
import ErrorFallback from "./ErrorFallback";

interface FeedProps {
  error: string | null;
  posts: PostType[];
}

export default function Feed({ error, posts }: FeedProps) {
  if (error) {
    return <ErrorFallback message={error} />;
  }
  return (
    <div className="feed">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
