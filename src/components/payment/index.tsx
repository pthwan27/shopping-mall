import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import PaymentList from "./paymentList";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentModal from "./paymentModal";
import { useMutation } from "@tanstack/react-query";
import { PayItem } from "../../graphqlTypes";
import { graphqlFetcher } from "../../queryClient";
import EXECUTE_PAY from "../../graphql/payment";

const payment = () => {
  const { mutate: pay } = useMutation({
    mutationFn: (info: PayItem[]) => {
      return graphqlFetcher(EXECUTE_PAY, { info });
    },
  });

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
    const payInfos = checkedCartData.map(({ id, amount }) => {
      return { id, amount };
    });
    pay(payInfos);

    setCheckedCartData([]);

    navigate("/products", { replace: true });
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
