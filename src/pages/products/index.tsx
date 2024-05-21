import { useQuery } from "@tanstack/react-query";
import { QueryKey, graphqlFetcher } from "../../queryClient";
import GET_PRODUCTS from "../../graphql/products";
import { Products } from "../../graphqlTypes";
import ProductList from "../../components/product/productList";

const ProductListPage = () => {
  const { data } = useQuery<Products>({
    queryKey: [QueryKey.PRODUCTS],
    queryFn: () => graphqlFetcher(GET_PRODUCTS),
  });

  if (!data || !data.products) {
    return <div>데이터가 없습니다</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <ProductList list={data} />
    </div>
  );
};
export default ProductListPage;
