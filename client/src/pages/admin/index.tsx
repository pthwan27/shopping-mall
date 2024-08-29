import { InfiniteData, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { QueryKey as QUERYKEY, graphqlFetcher } from "../../queryClient";
import GET_PRODUCTS from "../../graphql/products";
import { Product } from "../../graphqlTypes";
import ProductList from "../../components/product/productList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const QUERY_KEY = [QUERYKEY.PRODUCTS];

const AdminPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = useInfiniteQuery<
    { products: Product[] },
    Error,
    InfiniteData<{ products: Product[] }>,
    QueryKey
  >({
    queryKey: [QUERY_KEY, false],
    queryFn: ({ pageParam }) => {
      return graphqlFetcher(GET_PRODUCTS, { cursor: pageParam, showDeleted: true });
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.products.length === 0) return undefined;

      return lastPage.products[lastPage.products.length - 1].id;
    },

    initialPageParam: "",

    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        products: page.products,
      })),
    }),
  });

  //관찰 대상으로 만들고, observe
  const loadMoreRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetching: isFetchingNextPage,
  });

  if (!data || !data.pages) {
    return <div>데이터가 없습니다</div>;
  }

  const createProduct = () => {};

  return (
    <div>
      <div id="admin_header__div">
        <h2>상품 목록</h2>
        <button> 상품 등록 </button>
      </div>
      {data.pages.map((page, index) => (
        <ProductList key={index} list={page} />
      ))}

      <div ref={loadMoreRef} style={{ height: 1 }}></div>

      {isFetchingNextPage && <p>로 딩 중 ~~</p>}
    </div>
  );
};
export default AdminPage;
