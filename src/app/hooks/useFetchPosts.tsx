import { useEffect, useState } from "react";
import { useStore } from "../store/storeContext";

export const useFetchPosts = () => {
  const { dispatch } = useStore();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${page}&delay=1000`);
      const newPosts = await res.json();
      dispatch({ type: "SET_POSTS", payload: newPosts });
      setLoading(false);
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { loading, setPage };
};
