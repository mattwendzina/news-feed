import React from "react";
import { render, screen } from "@testing-library/react";
import Feed from "../Feed";
import { Post } from "@/types";
import { expectDefined } from "../../../tsHelpers";

describe("Feed", () => {
  const posts: Required<Post>[] = [
    {
      content: "Test post 1",
      created_time: 1728033422000,
      author: { name: "testUser1", id: "1", profile_photo_url: "testUrl" },
      id: "1",
      reactions: { like: 1 },
      image_url: "testUrl",
    },
    {
      content: "Test post 2",
      created_time: 1728033423000,
      author: { name: "testUser2", id: "2", profile_photo_url: "testUrl" },
      id: "2",
      reactions: { like: 2 },
      image_url: "testUrl",
    },
    {
      content: "Test post 3",
      created_time: 1728033424000,
      author: { name: "testUser3", id: "3", profile_photo_url: "testUrl" },
      id: "3",
      reactions: { like: 3 },
      image_url: "testUrl",
    },
  ];
  it(`renders a list of ${posts.length} posts`, () => {
    render(<Feed posts={posts} />);
    const postElements = screen.getAllByText(/Test post/);
    expect(postElements).toHaveLength(posts.length);
  });

  it("renders the content of each post", () => {
    render(<Feed posts={posts} />);
    posts.forEach((post) => {
      const content = expectDefined(post.content, "Post content is undefined");
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
  it("renders the user of each post", () => {
    render(<Feed posts={posts} />);
    posts.forEach((post) => {
      const user = expectDefined(post.author?.name, "Post author is undefined");
      expect(screen.getByText(user)).toBeInTheDocument();
    });
  });
  it("renders the timestamp of each post", () => {
    render(<Feed posts={posts} />);
    posts.forEach((post) => {
      const createdTime = expectDefined(
        post.created_time,
        "Post timestamp is undefined"
      );
      const timestamp = new Date(createdTime).toLocaleString("en-GB");
      expect(screen.getByText(timestamp)).toBeInTheDocument();
    });
  });
});
