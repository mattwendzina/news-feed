"use client";
import React, { useRef } from "react";
import { Post, User } from "@/types";
import Feed from "./components/Feed";
import { PostComposer } from "./components/PostComposer";
import styles from "./page.module.css";
import { useDispatchPostsAndUsers } from "./hooks/useDispatchPostsAndUsers";
import { useFetchPosts } from "./hooks/useFetchPosts";
import { useInfiniteLoading } from "./hooks/useInfiniteLoading";

interface HomeWithClientStateProps {
  posts: Post[];
  users: User[];
}

export const HomeWithClientState = ({
  posts,
  users,
}: HomeWithClientStateProps) => {
  const loader = useRef(null);

  // Load users and posts into store
  useDispatchPostsAndUsers({ posts, users });

  const { loading, setPage } = useFetchPosts();

  useInfiniteLoading({ loader, loading, setPage });

  return (
    <div>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      <Feed posts={posts} users={users} error={null} />
      <div ref={loader} className={styles.loader}>
        {loading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
};
