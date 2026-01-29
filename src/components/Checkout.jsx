import Modal from "./Modal";
import { use, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgress";
import Input from "./Input";

export default function Checkout() {
  const [error, setError] = useState(false);

  const { items } = use(CartContext);
  const { progress, hideCheckout } = use(UserProgressContext);

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

  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    try {
      const response = fetch("http://localhost:3000/ordersdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: items,
            customer: data,
          },
        }),
      });

      if (!response.ok) {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <>
      <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {totalAmount}</p>
          <Input label="Full name" type="text" id="name" />
          <Input label="E-mail Address" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal code" type="number" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
          <p className="modal-actions">
            <button
              type="button"
              onClick={handleCloseCheckout}
              className="text-button"
            >
              Close
            </button>
            <button className="button">Submit Order</button>
          </p>
        </form>
      </Modal>
    </>
  );
}
