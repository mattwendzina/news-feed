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
const ADD_POST = "ADD_POST";

export type Action =
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_POST"; payload: Post };

export function reducer(
  state: NormalizedState,
  action: Action
): NormalizedState {
  const posts: Record<string, NormalizedPost> = { ...state.posts };
  const users = { ...state.users };

  switch (action.type) {
    case SET_POSTS:
      action.payload.forEach((post) => {
        const { author, ...restOfPost } = post;
        if (author && author.id) {
          // Add the author to the users slice
          users[author.id] = author;
        }

        // Create a new post object with authorId instead of author object
        posts[post.id as string] = {
          ...restOfPost,
          authorId: post.author?.id as string, // Replace author with authorId
        };
      });

      return {
        ...state,
        posts: posts,
        users: users,
      };
    case SET_USERS:
      action.payload.forEach((user) => {
        users[user.id as string] = user;
      });
      return {
        ...state,
        users: users,
      };
    case ADD_POST:
      const { author, ...restOfPost } = action.payload;
      if (author && author.id) {
        users[author.id] = author;
      }
      posts[action.payload.id as string] = {
        ...restOfPost,
        authorId: author?.id,
      };
      const newState = { ...state, posts: posts, users: users };

      return newState;
    default:
      return state;
  }
}
