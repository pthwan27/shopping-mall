import { Cart } from "../../graphqlTypes";

const paymentItem = ({ id, imageURL, title, price, amount }: Cart) => (
  <li>
    <img src={imageURL}></img>
    <p>{title}</p>
    <p>{amount}</p>
  </li>
);

export default paymentItem;
