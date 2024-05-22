import { SyntheticEvent, createRef, useEffect, useRef, useState } from "react";
import { CartType } from "../../graphqlTypes";
import CartItem from "./cartItem";
import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import WillPay from "./willPay";

const cartList = ({ items }: { items: CartType[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();

  //recoil
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);

  const handleSelectAllChange = (target: HTMLInputElement) => {
    const allChecked = target.checked;

    checkboxRefs.forEach((item) => {
      item.current!.checked = allChecked;
    });
  };

  const updateAllItemsCheckedState = () => {
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    const allChecked = selectedCount === items.length;
    const selectAllCheckbox =
      formRef.current.querySelector<HTMLInputElement>(".select-all");

    if (selectAllCheckbox) selectAllCheckbox.checked = allChecked;
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;

    //form 안에서 무엇을 눌렀는지
    const targetInput = e?.target as HTMLInputElement;

    if (targetInput && targetInput.name.includes("select-all")) {
      //전체선택 버튼이라면
      handleSelectAllChange(targetInput);
    } else {
      //선택된게 상품 갯수랑 같으면 전체 선택 체크 상태로
      updateAllItemsCheckedState();
    }

    const data = new FormData(formRef.current);
    setFormData(data);
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      console.log(checkedCartData);
      const itemRef = checkboxRefs.find((ref) => {
        return ref.current!.dataset.id === item.id;
      });
      console.log(itemRef);

      if (itemRef) {
        itemRef.current!.checked = true;
      }
    });
    updateAllItemsCheckedState();
  }, [checkedCartData, checkboxRefs]);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, idx) => {
      if (ref.current!?.checked) {
        res.push(items[idx]);
      }

      return res;
    }, []);

    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className="select-all" name="select-all" type="checkbox" />
          전체선택
        </label>
        <ul className="cart">
          {items.map((item: CartType, i: number) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
          ))}
        </ul>
      </form>
      <WillPay />
    </div>
  );
};

export default cartList;
