import React from "react";
import { Post as PostType, User, User as UserType } from "@/types";
import { render, screen } from "@testing-library/react";
import Post from "../Post";
import { expectDefined } from "../../../tsHelpers";

describe("Post", () => {
  const post: Required<PostType> = {
    content: "Test post 1",
    created_time: 1728033422000,
    author: { name: "Matt", id: "1", profile_photo_url: "testUrl" },
    id: "1",
    reactions: { like: 1 },
    image_url: "testUrl",
  };
  const user: Required<UserType> = {
    id: "1",
    name: "Matt",
    profile_photo_url: "https://example.com/matt-profile.jpg",
  };

  it("renders a post", () => {
    render(<Post post={post} user={user} />);
    const postUser = expectDefined(
      post.author?.name,
      "Post author is undefined"
    );
    expect(screen.getByText(postUser)).toBeInTheDocument();

    const content = expectDefined(post.content, "Post content is undefined");
    expect(screen.getByText(content)).toBeInTheDocument();

    const createdTime = expectDefined(
      post.created_time,
      "Post timestamp is undefined"
    );
    const timestampText = new Date(createdTime).toLocaleString("en-GB");
    expect(screen.getByText(timestampText)).toBeInTheDocument();
  });

  it("renders null when user, content, or timestamp is missing", () => {
    const { container } = render(
      <Post
        post={{ author: { name: "" }, content: "", created_time: undefined }}
        user={null as unknown as User} // Bypass the type check
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
