import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QueryKey, graphqlFetcher } from "../../queryClient";
import ProductDetail from "../../components/product/detail";
import Product from "../../graphqlTypes";
import { GET_PRODUCT } from "../../graphql/products";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>({
    queryKey: [QueryKey.PRODUCTS, id],
    queryFn: () => graphqlFetcher(GET_PRODUCT, { id }),
  });
  console.log(data);

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail {...data} />;
    </div>
  );
};

export default ProductDetailPage;
