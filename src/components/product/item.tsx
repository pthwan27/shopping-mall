import { Link } from "react-router-dom";
import { Product } from "../../graphqlTypes";
import { useMutation } from "@tanstack/react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";

const ProductItem = ({ id, title, price, imageURL }: Product) => {
  const { mutate: addCart } = useMutation({
    mutationFn: (id: string) => {
      return graphqlFetcher(ADD_CART, { id });
    },
  });
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <img className="product-item__image" src={imageURL}></img>
        <span className="product-item__price">${price}</span>
      </Link>
      <button className="product-item_add-cart" onClick={() => addCart(id)}>
        담기
      </button>
    </li>
  );
};

export default ProductItem;
