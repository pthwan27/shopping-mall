import { CartType } from "../../graphqlTypes";
const CartItem = ({ id, imageURL, title, price, amount }: CartType) => {
  return (
    <div className="cart-item">
      <p className="cart-item__title">{id}</p>
      <img className="cart-item__image" src={imageURL}></img>
      <p className="cart-item__title">{title}</p>
      <span className="cart-item__price">${price}</span>
      <p className="cart-item__amount">{amount}</p>
    </div>
  );
};

export default CartItem;
