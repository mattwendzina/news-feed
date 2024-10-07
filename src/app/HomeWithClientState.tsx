"use client";
import React, { useRef, useState, useEffect } from "react";
import { Post, User } from "@/types";
import Feed from "./components/Feed";
import { PostComposer } from "./components/PostComposer";
import styles from "./page.module.css";
import { useStore } from "./store/storeContext";

interface HomeWithClientStateProps {
  posts: Post[];
  users: User[];
}

export const HomeWithClientState = ({
  posts,
  users,
}: HomeWithClientStateProps) => {
  const { dispatch } = useStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    dispatch({ payload: posts, type: "SET_POSTS" });
    dispatch({ payload: users, type: "SET_USERS" });
  }, []);

  // Fetch posts when page changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${page}`);
      const newPosts = await res.json();
      dispatch({ type: "SET_POSTS", payload: newPosts });
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);

  // Unobserve the loader during loading to prevent infinite loop
  useEffect(() => {
    if (loading && loader.current) {
      // Pause observing while loading is true
      const observer = new IntersectionObserver(() => {});
      observer.unobserve(loader.current);
    }
  }, [loading]);

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
