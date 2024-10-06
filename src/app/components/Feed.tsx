import React from "react";
import { NormalizedPost, User } from "@/types";
import Post from "./Post";
import ErrorFallback from "./ErrorFallback";

interface FeedProps {
  error: string | null;
  posts: NormalizedPost[];
  users: User[];
}

export default function Feed({ error, posts, users }: FeedProps) {
  if (error) {
    return <ErrorFallback message={error} />;
  }

  return (
    <div className="feed">
      {posts.map((post, index) => {
        const user = users.find((user) => user.id === post.authorId);
        return <Post key={index} post={post} user={user} />;
      })}
    </div>
  );
}
