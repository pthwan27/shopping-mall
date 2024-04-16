import { useQuery } from "@tanstack/react-query";
import { QueryKey, graphqlFetcher } from "../../queryClient";
import ProductItem from "../../components/product/item";
import GET_PRODUCTS from "../../graphql/products";
import { Products } from "../../graphqlTypes";

const ProductList = () => {
  const { data } = useQuery<Products>({
    queryKey: [QueryKey.PRODUCTS],
    queryFn: () => graphqlFetcher(GET_PRODUCTS),
  });

  return (
    <div>
      <h2>상품 목록</h2>
      <ul className="products">
        {data?.products?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
