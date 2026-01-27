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

  const imgSrc =
    "https://raw.githubusercontent.com/avi-codesmith/React-food-order-web-app/main/backend/public/";

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

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

      <Modal className="cart" ref={openModal}>
        <h2>🛒 Your Cart</h2>
        <ul>
          {items.map((item) => (
            <>
              <img className="food-s1" src={`${imgSrc}${item.image}`} /> x{" "}
              {item.quantity}
              <li className="cart-item" key={item.id}>
                {item.name}
              </li>
            </>
          ))}
        </ul>
        <p className="cart-total">{cartTotal}</p>
        <p className="modal-actions">
          <button className="text-button">Close</button>
          <button className="button">Checkout</button>
        </p>
      </Modal>
    </>
  );
}
