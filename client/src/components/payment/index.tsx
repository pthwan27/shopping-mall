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

const Payment = () => {
  const queryClient = getClient();
  useEffect(() => {
    const cartData = queryClient.getQueryData([QueryKey.CART]);

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
    onMutate: async (info: PayInfo[]) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.CART] });

      const prevCart = queryClient.getQueryData<{ carts: Cart[] }>([
        QueryKey.CART,
      ]);

      if (!prevCart) return;

      const infoMap = new Map<string, number>(
        info.map(({ id, amount }: { id: string; amount: number }) => [
          id,
          amount,
        ])
      );

      const newCart = prevCart.carts.reduce((acc: Cart[], item: Cart) => {
        const targetItemAmount = infoMap.get(item.id);

        if (targetItemAmount && targetItemAmount > 0) {
          const updatedItem = { ...item };

          updatedItem.amount -= targetItemAmount;

          if (updatedItem.amount > 0) {
            acc.push(updatedItem);
          }
        } else {
          acc.push(item);
        }

        return acc;
      }, [] as Cart[]);

      queryClient.setQueryData([QueryKey.CART], { carts: newCart });

      return prevCart.carts;
    },

    onError: (error, _, context) => {
      console.log(error);

      if (context) {
        queryClient.setQueryData([QueryKey.CART], { carts: context });
      }
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
export default Payment;
