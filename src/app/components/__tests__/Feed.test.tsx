import React from "react";
import { render, screen } from "@testing-library/react";
import Feed from "../Feed";
import { Post } from "@/types";

describe("Feed", () => {
  const posts: Required<Post>[] = [
    { content: "Test post 1", timestamp: 1728033422000, user: "testUser1" },
    { content: "Test post 2", timestamp: 1728033423000, user: "testUser2" },
    { content: "Test post 3", timestamp: 1728033424000, user: "testUser3" },
  ];
  it(`renders a list of ${posts.length} posts`, () => {
    render(<Feed posts={posts} />);
    const postElements = screen.getAllByText(/Test post/);
    expect(postElements).toHaveLength(posts.length);
  });

  it("renders the content of each post", () => {
    render(<Feed posts={posts} />);
    posts.forEach((post) => {
      expect(screen.getByText(post.content)).toBeInTheDocument();
    });
  });
  it("renders the user of each post", () => {
    render(<Feed posts={posts} />);
    posts.forEach((post) => {
      expect(screen.getByText(post.user)).toBeInTheDocument();
    });
  });
  it("renders the timestamp of each post", () => {
    render(<Feed posts={posts} />);
    posts.forEach((post) => {
      const timestamp = new Date(post.timestamp).toLocaleString("en-GB");
      expect(screen.getByText(timestamp)).toBeInTheDocument();
    });
  });
});
