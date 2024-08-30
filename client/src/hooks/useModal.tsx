import { useCallback, useId, useState } from "react";
import { modalState } from "../recoil/modal";
import { useRecoilState } from "recoil";

const isArrEmpty = (arr: unknown[]) => arr.length === 0;

const useModal = (component: React.FC) => {
  const [modalElements, setModal] = useRecoilState(modalState);

  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    setIsOpen(true);
    setModal((pre: any) => [...pre, { id: id, element: component }]);

    document.body.style.overflow = "hidden";
  }, [component, id, setModal]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModal((pre: any) => pre.filter((c: any) => c.id !== id));

    if (isArrEmpty(modalElements)) document.body.style.overflow = "unset";
  }, [modalElements, id, setModal]);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
