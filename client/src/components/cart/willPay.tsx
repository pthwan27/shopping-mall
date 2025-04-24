import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../recoil/cart";
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
        <label>결제 상품</label>
        <ul className="cart-willpay-item">
          {checkedItems.map(({ id, amount, product }) => (
            <li key={id}>
              <img className="cart-item__image" src={product.imageURL}></img>
              <p className="cart-item__title">{product.title}</p>

              <p className="cart-item__amount">{amount}개</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-willpay-total">총액 : ${totalPrice}</div>
      <button className="cart-willpay-btn" onClick={goToPayment}>
        결제 페이지로
      </button>
    </div>
  );
};

export default WillPay;
