// /app/api/posts/route.ts
import { Post } from "@/types";
import { NextResponse } from "next/server";

const mockPosts: Post[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  content: `Post content ${i + 1}`,
  created_time: Date.now() - i * 60000, // Stagger timestamps
  author: {
    id: `${i % 10}`, // Simulate 10 authors
    name: `Author ${i % 10}`,
    profile_photo_url: "https://via.placeholder.com/150",
  },
  reactions: {
    like: Math.floor(Math.random() * 10),
    love: Math.floor(Math.random() * 5),
  },
  image_url: "https://via.placeholder.com/300",
}));

// Handle GET requests to `/api/posts`
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = 20;
  const start = (page - 1) * pageSize;

  const paginatedPosts = mockPosts.slice(start, start + pageSize);

  return NextResponse.json(paginatedPosts);
}
