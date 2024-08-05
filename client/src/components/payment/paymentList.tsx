import { Cart } from "../../graphqlTypes";
import PaymentItem from "./paymentItem";

const paymentList = ({ paymentItems }: { paymentItems: Cart[] }) => (
  <div>
    <ul>
      {paymentItems.map((item: Cart) => (
        <PaymentItem {...item} key={item.id} />
      ))}
    </ul>
  </div>
);

export default paymentList;
