import { Cart } from "../../graphqlTypes";

const paymentItem = ({ id, amount, product }: Cart) => (
  <li>
    <img src={product.imageURL}></img>
    <p>{product.title}</p>
    <p>{amount}</p>
  </li>
);

export default paymentItem;
