import { Maybe } from "./tsHelpers";

export type User = {
  id?: Maybe<string>;
  name?: Maybe<string>;
  profile_photo_url?: Maybe<string>;
};

export type Post = {
  id?: Maybe<string>;
  created_time?: Maybe<number>;
  content?: Maybe<string>;
  author?: Maybe<User>;
  reactions?: Maybe<Record<string, number>>;
  image_url?: Maybe<string>;
};

export type NormalizedPost = Omit<Post, "author"> & {
  authorId?: Maybe<string>;
};

export type Feed = {
  posts?: Maybe<Post[]>;
  pagination?: {
    currentPage?: Maybe<number>;
    totalPages?: Maybe<number>;
  };
};

export type NewPost = {
  message: string;
  image?: File; // for image upload
};
