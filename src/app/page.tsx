import styles from "./page.module.css";
import { Post, User } from "@/types";
import { HomeWithClientState } from "./HomeWithClientState";
import { StoreProvider } from "./store/storeContext";

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
    <StoreProvider>
      <div className={styles.page}>
        <HomeWithClientState posts={posts} users={users} />
      </div>
    </StoreProvider>
  );
}
