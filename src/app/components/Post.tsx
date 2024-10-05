import React from "react";
import type { Post as PostType } from "@/types";
import { useEffect, useState } from "react";

export interface PostProps {
  post?: PostType;
}

export default function Post({ post }: PostProps) {
  const { author, content, created_time } = post || {};
  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    // This will run on the client after hydration
    if (created_time) {
      setClientTime(new Date(created_time).toLocaleString("en-GB"));
    }
  }, [created_time]);

  if (!author?.name || !content || !created_time) {
    return null;
  }

  return (
    <div className="post">
      <h3>{author.name}</h3>
      <p>{content}</p>
      <small>
        {/* Conditionally render the timestamp after hydration */}
        {clientTime && <small>{clientTime}</small>}
      </small>
    </div>
  );
}
