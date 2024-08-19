import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Cart } from "../../graphqlTypes";
import CartItem from "./cartItem";
import { useRecoilState } from "recoil";
import { checkedCartState } from "../../recoil/cart";
import WillPay from "./willPay";

const CartList = ({ items }: { items: Cart[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [formData, setFormData] = useState<FormData>();

  // Recoil
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  useEffect(() => {
    checkboxRefs.current = items.map(() => null);
  }, [items]);

  const handleSelectAllChange = (target: HTMLInputElement) => {
    const allChecked = target.checked;

    checkboxRefs.current.forEach((item) => {
      if (item) {
        item.checked = allChecked;
      }
    });
  };

  const updateAllItemsCheckedState = () => {
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    const allChecked = selectedCount === items.length;
    const selectAllCheckbox = formRef.current.querySelector<HTMLInputElement>(".select-all");

    if (selectAllCheckbox) selectAllCheckbox.checked = allChecked;
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;

    const targetInput = e?.target as HTMLInputElement;

    if (targetInput && targetInput.name.includes("select-all")) {
      handleSelectAllChange(targetInput);
    } else {
      updateAllItemsCheckedState();
    }

    const data = new FormData(formRef.current);
    setFormData(data);
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.current.find((ref) => ref?.dataset.id === item.id);

      if (itemRef) {
        itemRef.checked = true;
      }
    });
    updateAllItemsCheckedState();
  }, [checkedCartData]);

  useEffect(() => {
    const checkedItems = checkboxRefs.current.reduce<Cart[]>((res, ref, idx) => {
      if (ref?.checked) {
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
          {items.map((item: Cart, i: number) => (
            <CartItem {...item} key={item.id} ref={(el) => (checkboxRefs.current[i] = el)} />
          ))}
        </ul>
      </form>
      <WillPay />
    </div>
  );
};

export default CartList;
