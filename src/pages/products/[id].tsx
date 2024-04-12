import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types";
import { useParams } from "react-router-dom";
import { QueryKey, fetcher } from "../../queryClient";
import ProductDetail from "../../components/product/detail";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>({
    queryKey: [QueryKey.PRODUCTS, id],
    queryFn: () =>
      fetcher({
        method: "GET",
        path: `/products/${id}`,
      }),
  });

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail {...data} />;
    </div>
  );
};

export default ProductDetailPage;
