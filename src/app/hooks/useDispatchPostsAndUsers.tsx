import { useEffect } from "react";
import { useStore } from "../store/storeContext";
import { Post, User } from "@/types";

interface UseDispatchPostsAndUsersProps {
  posts: Post[];
  users: User[];
}

export const useDispatchPostsAndUsers = ({
  posts,
  users,
}: UseDispatchPostsAndUsersProps) => {
  const { dispatch } = useStore();
  useEffect(() => {
    dispatch({ payload: posts, type: "SET_POSTS" });
    dispatch({ payload: users, type: "SET_USERS" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, users]);
};
