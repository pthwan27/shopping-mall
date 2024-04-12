import { useQuery } from "@tanstack/react-query";
import { QueryKey, fetcher } from "../../queryClient";
import { Product } from "../../types";
import ProductItem from "../../components/product/item";

const ProductList = () => {
  const { data } = useQuery<Product[]>({
    queryKey: [QueryKey.PRODUCTS],
    queryFn: () =>
      fetcher({
        method: "GET",
        path: "/products",
      }),
  });

  return (
    <div>
      <h2>상품 목록</h2>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
