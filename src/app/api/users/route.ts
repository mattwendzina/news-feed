import { User } from "@/types";
import { NextResponse } from "next/server";

// Example users data
const users: Required<User>[] = [
  {
    id: "0",
    name: "Josh",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "1",
    name: "Matt",
    profile_photo_url: "https://example.com/matt-profile.jpg",
  },
  {
    id: "2",
    name: "Jon",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "3",
    name: "Scott",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "4",
    name: "Amy",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "5",
    name: "Rebecca",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "6",
    name: "Rachel",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "7",
    name: "John",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "8",
    name: "Steve",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
  {
    id: "9",
    name: "Simon",
    profile_photo_url: "https://example.com/jon-profile.jpg",
  },
];

// Handle GET requests to `/api/users`
export async function GET() {
  return NextResponse.json(users);
}
