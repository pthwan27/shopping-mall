import { CartType } from "../../graphqlTypes";
import PaymentItem from "./paymentItem";

const paymentList = ({ paymentItems }: { paymentItems: CartType[] }) => (
  <div>
    <ul>
      {paymentItems.map((item: CartType) => (
        <PaymentItem {...item} />
      ))}
    </ul>
  </div>
);

export default paymentList;
