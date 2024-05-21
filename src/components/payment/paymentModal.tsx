import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPotal = ({ children }: { children: ReactNode }) => {
  if (!children) return;

  const root = document.getElementById("paymentModal");
  return root && createPortal(<>{children}</>, root);
};

const paymentModal = ({ show, yes, no }: { show: boolean; yes: () => void; no: () => void }) => {
  return show ? (
    <ModalPotal>
      <p>정말 결제할까요?</p>
      <div>
        <button onClick={yes}>Yes</button>
        <button onClick={no}>No</button>
      </div>
    </ModalPotal>
  ) : null;
};
export default paymentModal;
