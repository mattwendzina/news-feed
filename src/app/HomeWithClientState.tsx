"use client";
import React from "react";
import { Post, User } from "@/types";
import Feed from "./components/Feed";
import { PostComposer } from "./components/PostComposer";
import styles from "./page.module.css";
import { useStore } from "./store/storeContext";
import { useEffect } from "react";

interface HomeWithClientStateProps {
  posts: Post[];
  users: User[];
}

export const HomeWithClientState = ({
  posts,
  users,
}: HomeWithClientStateProps) => {
  const { dispatch } = useStore();

  useEffect(() => {
    dispatch({ payload: posts, type: "SET_POSTS" });
    dispatch({ payload: users, type: "SET_USERS" });
  }, []);

  return (
    <div>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      {/* TODO - Update error prop */}
      <Feed posts={posts} users={users} error={null} />
    </div>
  );
};
