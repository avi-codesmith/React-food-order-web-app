import { use } from "react";

import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgress";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, addItem, removeItem } = use(CartContext);
  const { progress, hideCart, showCheckout } = use(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const actualPrice = `${Number(Math.floor(cartTotal * 91.58))}`;
  const discount = actualPrice * 0.2;
  const DiscountPrice = Number(actualPrice - discount + 100);
  const totalAmount = `₹ ${Math.round(DiscountPrice).toLocaleString(
    "en-IN"
  )}/-`;

  function handleCloseCart() {
    hideCart();
  }

  function handleOpenCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" && handleCloseCart}
    >
      <h2>🛒 Your {items.length > 0 ? "Cart" : "cart is empty"}</h2>
      {items.length === 0 && <p>Please add items to cart.</p>}
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
      {items.length > 0 && (
        <p className="cart-total">
          <p className="cart-total-price">
            <p>Actual:</p>
            <p>₹ {Math.round(actualPrice).toLocaleString("en-IN")}/-</p>
          </p>
          <p className="cart-total-price">
            <p>Discount:</p>
            <p>20%</p>
          </p>
          <p className="cart-total-price">
            <p>Delivery:</p>
            <p>₹ 100/-</p>
          </p>
          <p className="cart-total-price green">
            <p>Total:</p>
            <p>{totalAmount}</p>
          </p>
        </p>
      )}
      <p className="modal-actions">
        <button onClick={handleCloseCart} className="text-button">
          Close
        </button>
        {items.length > 0 && (
          <button onClick={handleOpenCheckout} className="button">
            Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}
