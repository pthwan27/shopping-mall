import { useQuery } from "@tanstack/react-query";
import GET_CART from "../../graphql/cart";
import { CartType } from "../../graphqlTypes";
import { QueryKey, graphqlFetcher } from "../../queryClient";
import CartList from "../../components/cart/cartList";

const cartPage = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.CART],
    queryFn: () => graphqlFetcher(GET_CART),
    staleTime: 0,
    gcTime: 1000,
  });
  if (!data) return <div>장바구니가 비었어요</div>;

  const cartItems = Object.values(data) as CartType[];
  if (!cartItems.length) return <div>장바구니가 비었어요</div>;

  return <CartList items={cartItems} />;
};

export default cartPage;
