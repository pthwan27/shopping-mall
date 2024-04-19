import { CartType } from "../../graphqlTypes";
import CartItem from "./item";

const cartList = ({ items }: { items: CartType[] }) => {
  console.log(items);
  return (
    <ul>
      {items.map((item: CartType) => (
        <CartItem {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default cartList;
