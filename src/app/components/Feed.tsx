"use client";
import React, { useEffect, useState } from "react";
import { Post as PostType, User } from "@/types";
import Post from "./Post";
import ErrorFallback from "./ErrorFallback";
import { useStore } from "../store/storeContext";

interface FeedProps {
  error: string | null;
  posts: PostType[];
  users: User[];
}

export default function Feed({ error, posts, users }: FeedProps) {
  const { state } = useStore();
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  if (error) {
    return <ErrorFallback message={error} />;
  }

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const postsToRender = isHydrated ? Object.values(state.posts) : posts;

  return (
    <div className="feed">
      {postsToRender.map((post, index) => {
        // Check if post has authorId (normalized) or nested author (non-normalized)
        const authorId = "authorId" in post ? post.authorId : post.author?.id;

        const user = isHydrated
          ? Object.values(state.users).find((user) => user.id === authorId)
          : users.find((user) => user.id === post.author?.id);

        return user ? <Post key={index} post={post} user={user} /> : null;
      })}
    </div>
  );
}
