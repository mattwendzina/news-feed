import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post, User } from "@/types";
import { PostComposer } from "./components/PostComposer";

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

export default async function Home() {
  const posts = await fetchPosts();
  const users = await fetchUsers();

  return (
    <div className={styles.page}>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      {/* TODO - Update error prop */}
      <Feed posts={posts} users={users} error={null} />
    </div>
  );
}
