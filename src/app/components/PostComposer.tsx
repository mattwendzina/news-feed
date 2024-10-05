import React from "react";
import styles from "./postComposer.module.css";
interface PostComposerProps {
  // TODO - remove the optional modifier from createPost
  createPost?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const PostComposer = ({ createPost }: PostComposerProps) => {
  return (
    <form
      onSubmit={createPost}
      className={styles["postComposer__form"]}
      role="form"
    >
      <textarea
        className={styles["postComposerForm__text-area"]}
        placeholder="What's on your mind?"
        name="postContent"
        rows={4}
        cols={40}
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
