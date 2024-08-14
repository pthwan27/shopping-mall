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

  const { mutate: updateCart } = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) => {
      return graphqlFetcher(UPDATE_CART, { id, amount });
    },
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.CART] });
      const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>([
        QueryKey.CART,
      ]);

      if (!prevCart) return prevCart;

      const newCart = {
        ...(prevCart || {}),
        [id]: { ...prevCart[id], amount },
      };
      queryClient.setQueryData([QueryKey.CART], newCart);

      return prevCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.CART] });
    },
  });

  const { mutate: deleteCart } = useMutation({
    mutationFn: ({ id }: { id: string }): Promise<string> => {
      return graphqlFetcher(DELETE_CART, { id });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.CART] });
      const prevCart = queryClient.getQueryData<{ [key: string]: Cart }>([
        QueryKey.CART,
      ]);

      const newCart = {
        ...(prevCart || {}),
      };

      queryClient.setQueryData([QueryKey.CART], newCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.CART] });
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
