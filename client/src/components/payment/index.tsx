import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import PaymentList from "./paymentList";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentModal from "./paymentModal";
import { useMutation } from "@tanstack/react-query";
import { Cart, PayInfo } from "../../graphqlTypes";
import { getClient, graphqlFetcher, QueryKey } from "../../queryClient";
import EXECUTE_PAY from "../../graphql/payment";

const payment = () => {
  const queryClient = getClient();
  useEffect(() => {
    const cartData = queryClient.getQueryData([QueryKey.CART]);
    console.log("cartData", cartData);

    if (!cartData) {
      // 카트 데이터가 없으면 빈 배열로 초기화
      queryClient.setQueryData([QueryKey.CART], { carts: [] });
    }
  }, [queryClient]);

  const { mutate: pay } = useMutation<
    { executePay: PayInfo[] },
    unknown,
    PayInfo[]
  >({
    mutationFn: (info: PayInfo[]) => {
      return graphqlFetcher(EXECUTE_PAY, { info });
    },
    onSuccess: ({ executePay }) => {
      const prevCart = queryClient.getQueryData<{ carts: Cart[] }>([
        QueryKey.CART,
      ]);
      console.log("prevCart", prevCart);

      console.log("executePay", executePay);
      queryClient.setQueryData([QueryKey.CART], (oldData) =>
        oldData
          ? {
              ...oldData,
            }
          : oldData
      );
    },
  });

  const { state } = useLocation();
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);

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
