import { CartType } from "../../graphqlTypes";
import CartItem from "./item";

const cartList = ({ items }: { items: CartType[] }) => {
  return (
    <>
      <label>
        <input type="checkbox" />
        전체선택
      </label>
      <ul className="cart">
        {items.map((item: CartType) => (
          <CartItem {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default cartList;
