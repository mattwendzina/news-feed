import React, { useState } from "react";
import styles from "./postComposer.module.css";
import { useStore } from "../store/storeContext";
import { Post } from "@/types";

export const PostComposer = () => {
  const { dispatch } = useStore();
  const [postContent, setPostContent] = useState("");

  const createPostHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: Post = {
      content: postContent,
      created_time: Date.now(),
      author: { id: "1", name: "Matt", profile_photo_url: "" },
      id: String(Date.now()),
      reactions: { like: 0, love: 0 },
      image_url: "https://via.placeholder.com/300",
    };

    dispatch({ payload: newPost, type: "ADD_POST" });
  };

  return (
    <form
      onSubmit={createPostHandler}
      className={styles["postComposer__form"]}
      role="form"
    >
      <textarea
        className={styles["postComposerForm__text-area"]}
        placeholder="What's on your mind?"
        name="postContent"
        rows={4}
        cols={40}
        value={postContent}
        onChange={(e) => {
          setPostContent(e.target.value);
        }}
      />
      <button
        className={styles["postComposerForm__submit-button"]}
        type="submit"
      >
        Post
      </button>
    </form>
  );
};
