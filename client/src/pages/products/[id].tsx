import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QueryKey, graphqlFetcher } from "../../queryClient";
import { Product } from "../../graphqlTypes";
import { GET_PRODUCT } from "../../graphql/products";
import ProductItemDetail from "../../components/product/productItemDetail";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<{ product: Product }>({
    queryKey: [QueryKey.PRODUCTS, id],
    queryFn: () => graphqlFetcher(GET_PRODUCT, { id }),
  });

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductItemDetail {...data.product} />
    </div>
  );
};

export default ProductDetailPage;
