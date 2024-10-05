import styles from "./page.module.css";
import Feed from "./components/Feed";
import { Post } from "@/types";
import { PostComposer } from "./components/PostComposer";
import ErrorFallback from "./components/ErrorFallback";

export default async function Home() {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/api/posts`;

  const res = await fetch(apiUrl);
  const posts: Post[] = await res.json();

  if (!res.ok) {
    return <ErrorFallback message="There was an issue retrieving posts" />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.postComposer}>
        <PostComposer />
      </div>
      <Feed posts={posts} />
    </div>
  );
}
