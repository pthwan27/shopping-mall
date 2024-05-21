import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import PaymentList from "./paymentList";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentModal from "./paymentModal";

const payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  const [modalShow, setModalToggle] = useState(false);
  const showModal = () => {
    if (!checkedCartData.length) {
      return alert("결제할 상품이 없습니다");
    }

    setModalToggle(true);
  };

  const purchase = () => {
    //서버에서도 비워지게

    setCheckedCartData([]);
    navigate("/cart", { replace: true });
  };
  const cancle = () => {
    setModalToggle(false);
  };

  return (
    <div>
      <PaymentList paymentItems={checkedCartData} />
      <p> 총 금액 : ${state.totalPrice}</p>
      <button onClick={showModal}> 결제하기</button>
      <PaymentModal show={modalShow} yes={purchase} no={cancle}></PaymentModal>
    </div>
  );
};
export default payment;
