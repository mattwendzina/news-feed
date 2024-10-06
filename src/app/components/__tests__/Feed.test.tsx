import React from "react";
import { render, screen } from "@testing-library/react";
import Feed from "../Feed";
import { Post, User } from "@/types";
import { expectDefined } from "../../../tsHelpers";
import { StoreProvider } from "../../store/storeContext";
import { HomeWithClientState } from "../../HomeWithClientState";

// These tests have become a bit roundabout because of where we hydrate the client - in HomeWithClientState
// Therefore to keep things easier I'm just rendering that component as this means the store will get hydrated
describe("Feed", () => {
  const posts: Required<Post>[] = [
    {
      content: "Test post 1",
      created_time: 1728033422000,
      author: { name: "Matt", id: "1", profile_photo_url: "testUrl" },
      id: "1",
      reactions: { like: 1 },
      image_url: "testUrl",
    },
    {
      content: "Test post 2",
      created_time: 1728033423000,
      author: { name: "Jon", id: "2", profile_photo_url: "testUrl" },
      id: "2",
      reactions: { like: 2 },
      image_url: "testUrl",
    },
  ];
  const users: Required<User>[] = [
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
  ];
  it(`renders a list of ${posts.length} posts`, () => {
    render(
      <StoreProvider>
        <HomeWithClientState posts={posts} users={users} />
      </StoreProvider>
    );

    const postElements = screen.getAllByText(/Test post/);
    expect(postElements).toHaveLength(posts.length);
  });

  it("renders the content of each post", () => {
    render(
      <StoreProvider>
        <HomeWithClientState posts={posts} users={users} />
      </StoreProvider>
    );
    posts.forEach((post) => {
      const content = expectDefined(post.content, "Post content is undefined");
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
  it("renders the user of each post", () => {
    render(
      <StoreProvider>
        <HomeWithClientState posts={posts} users={users} />
      </StoreProvider>
    );

    posts.forEach((post) => {
      const user = expectDefined(post.author?.name, "Post author is undefined");
      expect(screen.getByText(user)).toBeInTheDocument();
    });
  });
  it("renders the timestamp of each post", () => {
    render(
      <StoreProvider>
        <HomeWithClientState posts={posts} users={users} />
      </StoreProvider>
    );
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
