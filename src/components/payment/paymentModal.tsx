import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPotal = ({ children }: { children: ReactNode }) => {
  if (!children) return;

  const root = document.getElementById("paymentModal");
  return root && createPortal(<>{children}</>, root);
};

const paymentModal = ({
  show,
  yes,
  no,
}: {
  show: boolean;
  yes: () => void;
  no: () => void;
}) => {
  return show ? (
    <ModalPotal>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-inner">
          <p>정말 결제할까요?</p>
          <div className="modal-inner-buttons">
            <button onClick={yes}>Yes</button>
            <button onClick={no}>No</button>
          </div>
        </div>
      </div>
    </ModalPotal>
  ) : null;
};
export default paymentModal;
