import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";

export default function Modal({ children, ref, className = "", ...props }) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    openModal() {
      dialog.current?.showModal();
    },
  }));

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} {...props}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
