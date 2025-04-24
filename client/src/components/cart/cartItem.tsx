import { useMutation } from "@tanstack/react-query";
import { Cart } from "../../graphqlTypes";
import { QueryKey, getClient, graphqlFetcher } from "../../queryClient";
import { DELETE_CART, UPDATE_CART } from "../../graphql/cart";
import {
  ForwardedRef,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useState,
} from "react";
import ItemData from "./cartItemData";
import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoil/cart";

const CartItem = (
  { id, amount, product }: Cart,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [cartItemsAmount, setCartItemsAmount] = useState(amount);

  const queryClient = getClient();

  //recoil
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);

  const { mutate: updateCart } = useMutation<
    { updateCart: Cart[] },
    unknown,
    { id: string; amount: number },
    Cart[] | unknown
  >({
    mutationFn: ({ id, amount }: { id: string; amount: number }) => {
      return graphqlFetcher(UPDATE_CART, { id, amount });
    },
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.CART] });

      const prevCart = queryClient.getQueryData<{ carts: Cart[] }>([
        QueryKey.CART,
      ]);

      if (!prevCart) return;

      const updateCartIdx = prevCart.carts.findIndex(
        (item: Cart) => item.id == id
      );

      if (updateCartIdx < 0) return prevCart;

      const newCart = prevCart.carts.map((item) =>
        item.id === id ? { ...item, amount } : item
      );

      queryClient.setQueryData([QueryKey.CART], { carts: newCart });

      return prevCart.carts;
    },
    onError: (error, _, context) => {
      console.log(error);

      if (context) {
        queryClient.setQueryData([QueryKey.CART], { carts: context });
      }
    },
  });

  const { mutate: deleteCart } = useMutation<
    string,
    unknown,
    { id: string },
    Cart[] | unknown
  >({
    mutationFn: ({ id }: { id: string }) => {
      return graphqlFetcher(DELETE_CART, { id });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.CART] });
      const prevCart = queryClient.getQueryData<{ carts: Cart[] }>([
        QueryKey.CART,
      ]);

      if (!prevCart) return;

      const deleteCartIdx = prevCart?.carts.findIndex((item) => item.id === id);

      if (deleteCartIdx < 0) {
        return prevCart;
      }

      const newCart = prevCart.carts.filter((item) => item.id !== id);

      queryClient.setQueryData([QueryKey.CART], { carts: newCart });

      return prevCart.carts;
    },
    onError: (error, _, context) => {
      console.log(error);

      if (context) {
        queryClient.setQueryData([QueryKey.CART], { carts: context });
      }
    },
  });

  useEffect(() => {
    setCartItemsAmount(amount);
  }, [amount]);

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;

    setCartItemsAmount(amount);
    updateCart({ id, amount });
  };

  const handleDeleteItem = () => {
    deleteCart({ id });

    const newCheckedCartDate = checkedCartData.filter(
      (checkedCartItem) => checkedCartItem.id !== id
    );

    setCheckedCartData(newCheckedCartDate);
  };
  return (
    <li className="cart-item" key={id}>
      <input
        className="cart-item__checkbox"
        type="checkbox"
        name="select-item"
        ref={ref}
        data-id={id}
      />
      <ItemData {...product} />
      <input
        type="number"
        className="cart-item__amount"
        value={cartItemsAmount}
        onChange={handleUpdateAmount}
        min={1}
      ></input>
      <button
        className="cart-item__button"
        type="button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
