import { useEffect, useRef } from "react";

type UseIntersectionObserverProps = {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  rootMargin?: string;
};

const useIntersectionObserverWithUnobserve = ({
  onIntersect,
  hasNextPage,
  isFetching,
}: UseIntersectionObserverProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        //entries => 관찰하고 있는 요소들의 상태 정보들
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          onIntersect();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    //관찰 대상으로 설정
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [onIntersect, hasNextPage, isFetching]);

  return observerRef;
};

export default useIntersectionObserverWithUnobserve;
