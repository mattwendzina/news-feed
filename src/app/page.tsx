import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post } from "@/types";
import { PostComposer } from "./components/PostComposer";

async function fetchPosts(): Promise<Post[]> {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/api/posts`;

  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await res.json();
  return posts;
}

export default async function Home() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await fetchPosts();
  } catch (err) {
    console.error(err);
    error = "There was an issue retrieving posts";
  }

  return (
    <div className={styles.page}>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      <Feed posts={posts} error={error} />
    </div>
  );
}
