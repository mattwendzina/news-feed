import { NormalizedPost, Post, User } from "@/types";

type NormalizedState = {
  posts: Record<string, Post>;
  users: Record<string, User>;
};

export const initialState: NormalizedState = {
  posts: {},
  users: {},
};

const SET_POSTS = "SET_POSTS";
const SET_USERS = "SET_USERS";

type Action =
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "SET_USERS"; payload: User[] };

export function reducer(
  state: NormalizedState,
  action: Action
): NormalizedState {
  const newPosts: Record<string, NormalizedPost> = { ...state.posts };
  const newUsers = { ...state.users };

  switch (action.type) {
    case SET_POSTS:
      action.payload.forEach((post) => {
        const { author, ...restOfPost } = post;
        if (author && author.id) {
          // Add the author to the users slice
          newUsers[author.id] = author;
        }

        // Create a new post object with authorId instead of author object
        newPosts[post.id as string] = {
          ...restOfPost,
          authorId: post.author?.id as string, // Replace author with authorId
        };
      });

      return {
        ...state,
        posts: newPosts,
        users: newUsers,
      };
    case SET_USERS:
      action.payload.forEach((user) => {
        newUsers[user.id as string] = user;
      });
      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
}
