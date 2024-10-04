"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post } from "@/types";
import { PostComposer } from "./components/PostComposer";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([
    { content: "Hello, world!", timestamp: Date.now(), user: "Matt" },
    { content: "Hi, there!", timestamp: Date.now(), user: "Jon" },
  ]);

  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postContent = formData.get("postContent") as string;

    const newPost: Post = {
      content: postContent,
      timestamp: Date.now(),
      user: "Matt",
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.postComposer}>
        <PostComposer createPost={createPostHandler} />
      </div>
      <Feed posts={posts} />
    </div>
  );
}
