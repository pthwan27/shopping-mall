import { Link } from "react-router-dom";
import { Cart, Product } from "../../graphqlTypes";
import { useMutation } from "@tanstack/react-query";
import { getClient, graphqlFetcher, QueryKey } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";

const AdminProductItem = ({ id, title, price, imageURL }: Product) => {
  const queryClient = getClient();

  const { mutate: addCart } = useMutation<Cart, unknown, string, Cart[]>({
    mutationFn: (id: string) => {
      return graphqlFetcher(ADD_CART, { id });
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: [QueryKey.CART],
      });

      const prevCart = queryClient.getQueryData<{ carts: Cart[] }>([QueryKey.CART]);

      if (!prevCart) return;

      const existingItemIdx = prevCart.carts.findIndex((item) => item.id === id);

      let newCart;

      if (existingItemIdx >= 0) {
        newCart = prevCart.carts.map((item, idx) =>
          idx === existingItemIdx
            ? {
                ...item,
                amount: item.amount + 1,
              }
            : item
        );
      } else {
        const newItem = {
          id,
          amount: 1,
          product: {
            id,
            title,
            price,
            imageURL,
          },
        };
        newCart = [...prevCart.carts, newItem];
      }

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

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <img className="product-item__image" src={imageURL}></img>
      </Link>
      <span className="product-item__price">${price}</span>
      <button className="product-item_add-cart" onClick={() => addCart(id)}>
        담기
      </button>
    </li>
  );
};

export default AdminProductItem;
