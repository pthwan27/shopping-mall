import { CartType } from "../../graphqlTypes";

const itemDate = ({ imageURL, title, price }: Pick<CartType, "imageURL" | "title" | "price">) => {
  return (
    <>
      <img className="cart-item__image" src={imageURL}></img>
      <p className="cart-item__title">{title}</p>
      <p className="cart-item__price">${price}</p>
    </>
  );
};

export default itemDate;
