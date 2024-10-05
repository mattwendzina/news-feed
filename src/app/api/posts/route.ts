// /app/api/posts/route.ts
import { Post } from "@/types";
import { NextResponse } from "next/server";

// Example posts data
const posts: Required<Post>[] = [
  {
    author: {
      id: "1",
      name: "Matt",
      profile_photo_url: "https://via.placeholder.com/150",
    },
    content: "Hello, world!",
    created_time: Date.now(),
    reactions: { like: 3, love: 2 },
    id: "1",
    image_url: "https://via.placeholder.com/300",
  },
  {
    author: {
      id: "2",
      name: "Jon",
      profile_photo_url: "https://via.placeholder.com/150",
    },
    content: "Hi, there!",
    created_time: Date.now(),
    reactions: { like: 1, love: 1 },
    id: "2",
    image_url: "https://via.placeholder.com/300",
  },
];

// Handle GET requests to `/api/posts`
export async function GET() {
  return NextResponse.json(posts);
}
