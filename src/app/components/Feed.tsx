import React from "react";
import { Post as PostType } from "@/types";
import Post from "./Post";

interface FeedProps {
  posts: PostType[];
}

export default function Feed({ posts }: FeedProps) {
  return (
    <div className="feed">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
