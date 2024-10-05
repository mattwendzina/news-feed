import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post } from "@/types";
import { PostComposer } from "./components/PostComposer";

export default async function Home() {
  // TODO - Error handling
  // Construct absolute URL for fetching posts
  const apiUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/api/posts`;

  const response = await fetch(apiUrl);
  const posts: Post[] = await response.json();

  return (
    <div className={styles.page}>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      <Feed posts={posts} />
    </div>
  );
}
