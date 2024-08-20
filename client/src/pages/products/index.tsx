import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { QueryKey as QUERYKEY, graphqlFetcher } from "../../queryClient";
import GET_PRODUCTS from "../../graphql/products";
import { Product, Products } from "../../graphqlTypes";
import ProductList from "../../components/product/productList";
import { useEffect, useRef } from "react";

const QUERY_KEY = [QUERYKEY.PRODUCTS];

const ProductListPage = () => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = useInfiniteQuery<
    { products: Product[] },
    Error,
    InfiniteData<{ products: Product[] }>,
    QueryKey
  >({
    queryKey: QUERY_KEY,
    queryFn: ({ pageParam }) => {
      return graphqlFetcher(GET_PRODUCTS, { cursor: pageParam });
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.products.length === 0) return undefined;

      return lastPage.products[lastPage.products.length - 1].id;
    },

    initialPageParam: 0,

    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        products: page.products,
      })),
    }),
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data || !data.pages) {
    return <div>데이터가 없습니다</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      {data.pages.map((page, index) => (
        <ProductList key={index} list={page} />
      ))}

      <div ref={loadMoreRef} style={{ height: 1 }}></div>

      {isFetchingNextPage && <p>로 딩 중 ~~</p>}
    </div>
  );
};
export default ProductListPage;
