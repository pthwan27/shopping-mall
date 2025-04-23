import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import ItemData from "./cartItemData";
import { useNavigate } from "react-router-dom";

const WillPay = () => {
  const checkedItems = useRecoilValue(checkedCartState);
  const navigate = useNavigate();

  const totalPrice = checkedItems.reduce((prev, cur) => {
    prev += cur.amount * cur.product.price;
    return prev;
  }, 0);
  const goToPayment = () => {
    if (checkedItems.length)
      navigate("/payment", { state: { totalPrice: totalPrice } });
  };

  return (
    <div className="cart-willpay-container">
      <div className="cart-willpay">
        <ul className="cart-willpay-item">
          {checkedItems.map(({ id, amount, product }) => (
            <li key={id}>
              <ItemData {...product} />
              <p>amout : ${amount}</p>
              <p>total : ${product.price * amount}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-willpay-total">총액 : ${totalPrice}</div>
      <button onClick={goToPayment}>결제 페이지로</button>
    </div>
  );
};

export default WillPay;
