import React from "react";
import { Post as PostType } from "@/types";
import { render, screen } from "@testing-library/react";
import Post from "../Post";

describe("Post", () => {
  const post: Required<PostType> = {
    content: "Test post 1",
    timestamp: 1728033422000,
    user: "testUser1",
  };
  it("renders a post", () => {
    render(<Post post={post} />);

    expect(screen.getByText(post.user)).toBeInTheDocument();

    expect(screen.getByText(post.content)).toBeInTheDocument();

    const timestampText = new Date(post.timestamp).toLocaleString("en-GB");
    expect(screen.getByText(timestampText)).toBeInTheDocument();
  });

  it("renders null when user, content, or timestamp is missing", () => {
    const { container } = render(
      <Post post={{ user: "", content: "", timestamp: undefined }} />
    );
    expect(container.firstChild).toBeNull();
  });
});
