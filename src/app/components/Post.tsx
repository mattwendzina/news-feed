import type { Post as PostType } from "@/types";
import { useEffect, useState } from "react";

export interface PostProps {
  post?: PostType;
}

export default function Post({ post }: PostProps) {
  const { user, content, timestamp } = post || {};
  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    // This will run on the client after hydration
    if (timestamp) {
      setClientTime(new Date(timestamp).toLocaleString("en-GB"));
    }
  }, [timestamp]);

  if (!user || !content || !timestamp) {
    return null;
  }

  return (
    <div className="post">
      <h3>{user}</h3>
      <p>{content}</p>
      <small>
        {/* Conditionally render the timestamp after hydration */}
        {clientTime && <small>{clientTime}</small>}
      </small>
    </div>
  );
}
