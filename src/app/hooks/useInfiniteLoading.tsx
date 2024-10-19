import { useEffect } from "react";

interface UseInfiniteLoadProps {
  loader: React.MutableRefObject<null>;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useInfiniteLoading = ({
  loader,
  loading,
  setPage,
}: UseInfiniteLoadProps) => {
  useEffect(() => {
    const currentLoader = loader.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
};
