import { useQuery } from "@tanstack/react-query";
import GET_CART from "../../graphql/cart";
import { QueryKey, graphqlFetcher } from "../../queryClient";
import CartList from "../../components/cart/cartList";
import { Cart } from "../../graphqlTypes";

const cartPage = () => {
  const { data } = useQuery<{ carts: Cart[] }>({
    queryKey: [QueryKey.CART],
    queryFn: () => graphqlFetcher(GET_CART),
    staleTime: 0,
    gcTime: 30000,
  });
  if (!data || !data.carts || !data.carts.length) return <div>장바구니가 비었어요</div>;

  return <CartList items={data.carts} />;
};

export default cartPage;
