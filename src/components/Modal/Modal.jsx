import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

const Modal = ({ children, open, className = "" }) => {
  const dialogRef = useRef();
  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return ReactDOM.createPortal(
    <dialog ref={dialogRef} className={"modal" + className}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
