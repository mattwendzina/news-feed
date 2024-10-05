"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post } from "@/types";
import { PostComposer } from "./components/PostComposer";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postContent = formData.get("postContent") as string;

    const newPost: Post = {
      content: postContent,
      created_time: Date.now(),
      author: { name: "Jon" },
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
