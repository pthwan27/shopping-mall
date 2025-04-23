import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { Product } from "../../graphqlTypes";
import ProductItem from "./productItem";
import { QueryKey as QUERYKEY, graphqlFetcher } from "../../queryClient";
import GET_PRODUCTS from "../../graphql/products";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const QUERY_KEY = [QUERYKEY.PRODUCTS];

const ProductList = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery<
      { products: Product[] },
      Error,
      InfiniteData<{ products: Product[] }>,
      QueryKey
    >({
      queryKey: [QUERY_KEY, true],
      queryFn: ({ pageParam }) => {
        return graphqlFetcher(GET_PRODUCTS, { cursor: pageParam });
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

  return (
    <div className="container">
      {data.pages.map((page) => (
        <ul className="products">
          {page.products.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </ul>
      ))}

      <div ref={loadMoreRef} style={{ height: 1 }}></div>

      {isFetchingNextPage && <p>로 딩 중 ~~</p>}
    </div>
  );
};

export default ProductList;
