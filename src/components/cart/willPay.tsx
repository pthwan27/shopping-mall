import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import ItemData from "./itemData";
import { Link, useNavigate } from "react-router-dom";

const willPay = () => {
  const checkedItems = useRecoilValue(checkedCartState);
  const navigate = useNavigate();

  const totalPrice = checkedItems.reduce((prev, cur) => {
    prev += cur.amount * cur.price;
    return prev;
  }, 0);
  const goToPayment = () => {
    if (checkedItems.length) navigate("/payment");
  };

  return (
    <>
      <div className="cart-willpay">
        <ul className="cart-willpay-item">
          {checkedItems.map(({ imageURL, price, amount, title, id }) => (
            <li>
              <ItemData imageURL={imageURL} price={price} title={title} key={id} />
              <p>amout : ${amount}</p>
              <p>total : ${price * amount}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-willpay-total">총액 : ${totalPrice}</div>
      <button onClick={goToPayment}>결제하기</button>
    </>
  );
};

export default willPay;
