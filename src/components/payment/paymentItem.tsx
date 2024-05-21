import { CartType } from "../../graphqlTypes";

const paymentItem = ({ id, imageURL, title, price, amount }: CartType) => (
  <div>
    <img src={imageURL}></img>
    <p>{title}</p>
    <p>{amount}</p>
  </div>
);

export default paymentItem;
