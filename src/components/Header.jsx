import { use, useRef } from "react";

import Modal from "./Modal";
import logo from "../assets/logo.jpg";
import CartContex from "../store/CartContext";

export default function Header() {
  const { items } = use(CartContex);
  const openModal = useRef();

  const totalCartItems = items.reduce((totalNum, item) => {
    return totalNum + item.quantity;
  }, 0);

  function handleOpenModal() {
    openModal.current.openModal();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Food logo" />
          <h1>React food</h1>
        </div>
        <button onClick={handleOpenModal}>Cart ({totalCartItems})</button>
      </header>
      <Modal ref={openModal}>
        <h1>heading</h1>
        <p>this is the modal</p>
      </Modal>
    </>
  );
}
