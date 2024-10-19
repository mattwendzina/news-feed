"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { Post as PostType, User } from "@/types";
import Post from "./Post";
import ErrorFallback from "./ErrorFallback";
import { useStore } from "../store/storeContext";

interface FeedProps {
  error: string | null;
  posts: PostType[];
  users: User[];
}

const Feed = forwardRef<HTMLDivElement, FeedProps>(
  ({ error, posts, users }, ref) => {
    const { state } = useStore();

    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    if (error) {
      return <ErrorFallback message={error} />;
    }

    const postsToRender = isHydrated ? Object.values(state.posts) : posts;

    return (
      <div className="feed" ref={ref}>
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
);

Feed.displayName = "Feed";

export default Feed;
