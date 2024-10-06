"use client";
import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post, User } from "@/types";
import { PostComposer } from "./components/PostComposer";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./store/store";

const apiUrl = `${
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}/api`;

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${apiUrl}/posts`);

  if (!res.ok) throw new Error("Failed to fetch posts");

  const posts: Post[] = await res.json();
  return posts;
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${apiUrl}/users`);

  if (!res.ok) throw new Error("Failed to fetch users");

  const users: User[] = await res.json();
  return users;
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts();
        const users = await fetchUsers();

        dispatch({ payload: posts, type: "SET_POSTS" });
        dispatch({ payload: users, type: "SET_USERS" });
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, []);
  console.log("State", state);
  return (
    <div className={styles.page}>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      {/* TODO - Update error prop */}
      <Feed
        posts={Object.values(state.posts)}
        users={Object.values(state.users)}
        error={null}
      />
    </div>
  );
}
