"use client";
import React from "react";
import type { Post as PostType, User } from "@/types";
import { useEffect, useState } from "react";

export interface PostProps {
  post?: PostType;
  user?: User;
}

export default function Post({ user, post }: PostProps) {
  const { created_time, content } = post || {};

  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    // This will run on the client after hydration
    if (created_time) {
      setClientTime(new Date(created_time).toLocaleString("en-GB"));
    }
  }, [created_time]);

  if (!user || !content || !created_time) {
    return null;
  }

  return (
    <div className="post">
      <h3>{user.name}</h3>
      <p>{content}</p>
      <small>
        {/* Conditionally render the timestamp after hydration */}
        {clientTime && <small>{clientTime}</small>}
      </small>
    </div>
  );
}
