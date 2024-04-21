import { useMutation } from "@tanstack/react-query";
import { CartType } from "../../graphqlTypes";
import { QueryKey, getClient, graphqlFetcher } from "../../queryClient";
import { UPDATE_CART } from "../../graphql/cart";
import { SyntheticEvent } from "react";
const CartItem = ({ id, imageURL, title, price, amount }: CartType) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) => {
      return graphqlFetcher(UPDATE_CART, { id, amount });
    },
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.CART] });
      const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKey.CART]);

      if (!prevCart) return prevCart;

      const newCart = {
        ...(prevCart || {}),
        [id]: { ...prevCart[id], amount },
      };
      queryClient.setQueryData([QueryKey.CART], newCart);

      return prevCart;
    },
    onSuccess: (newValue) => {
      const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([QueryKey.CART]);

      const newCart = {
        ...(prevCart || {}),
        [id]: newValue,
      };
      queryClient.setQueryData([QueryKey.CART], newCart);
    },
  });

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    updateCart({ id, amount });
  };
  return (
    <li className="cart-item">
      <input className="cart-item__checkbox" type="checkbox" />
      <img className="cart-item__image" src={imageURL}></img>
      <p className="cart-item__title">{title}</p>
      <p className="cart-item__price">${price}</p>
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
      ></input>
      <button className="cart-item__button" type="button">
        삭제
      </button>
    </li>
  );
};

export default CartItem;
