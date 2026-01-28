import { use } from "react";

import Modal from "./Modal";
import CartContex from "../store/CartContext";
import UserProgressContext from "../store/UserProgress";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, addItem, removeItem } = use(CartContex);
  const { progress, hideCart } = use(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    hideCart();
  }

  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>🛒 Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            onInc={() => addItem(item)}
            onDec={() => removeItem(item.id)}
            {...item}
          />
        ))}
      </ul>
      <p className="cart-total">
        ₹ {Math.floor(cartTotal * 91.58).toLocaleString("en-IN")}
      </p>
      <p className="modal-actions">
        <button onClick={handleCloseCart} className="text-button">
          Close
        </button>
        <button onClick={handleCloseCart} className="button">
          Checkout
        </button>
      </p>
    </Modal>
  );
}
