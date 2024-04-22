import { SyntheticEvent, createRef, useRef } from "react";
import { CartType } from "../../graphqlTypes";
import CartItem from "./item";
import { all } from "axios";

const cartList = ({ items }: { items: CartType[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;

    //form 안에서 무엇을 눌렀는지
    const targetInput = e.target as HTMLInputElement;

    const data = new FormData(formRef.current);

    const selectedCount = data.getAll("select-item").length;

    if (targetInput.name.includes("select-all")) {
      //전체선택 버튼이라면
      const allChecked = targetInput.checked;

      checkboxRefs.forEach((inputElem) => {
        inputElem.current!.checked = allChecked;
      });
    } else {
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked = allChecked;
    }
  };

  return (
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
  );
};

export default cartList;
