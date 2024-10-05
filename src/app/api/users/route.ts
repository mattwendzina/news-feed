import { User } from "@/types";
import { NextResponse } from "next/server";

// Example users data
const users: Required<User>[] = [
  {
    id: "user1",
    name: "Matt",
    profile_photo_url: "https://example.com/matt-profile.jpg",
  },
  {
    id: "user2",
    name: "Jon",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
];

// Handle GET requests to `/api/users`
export async function GET() {
  return NextResponse.json(users);
}
