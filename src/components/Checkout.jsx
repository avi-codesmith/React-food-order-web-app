import { use, useActionState } from "react";

import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgress";
import Input from "./Input";
import useHttp from "../hooks/useHttp";

const formConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, onFinish } = use(CartContext);
  const { progress, hideCheckout } = use(UserProgressContext);

  const { data, error, handleHttp, clearData } = useHttp(
    "http://localhost:3000/orders",
    formConfig
  );

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

  function handleOnFinish() {
    hideCheckout();
    onFinish();
    clearData();
  }

  async function handleFormAction(prev, fd) {
    const data = Object.fromEntries(fd.entries());

    await handleHttp(
      JSON.stringify({
        order: {
          items: items,
          customer: data,
        },
      })
    );
  }

  const [formState, formAction, pending] = useActionState(
    handleFormAction,
    null
  );

  let actions = (
    <>
      <button
        type="button"
        onClick={handleCloseCheckout}
        className="text-button"
      >
        Close
      </button>
      <button className="button">Submit Order</button>
    </>
  );

  if (pending) {
    actions = <span>Please wait, Submiting you order...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
        <h2 className="green">Order Submited Sucessfully!</h2>
        <p>
          ● At your door step with in{" "}
          <span className="green">
            <strong>10 minutes.</strong>
          </span>
        </p>
        <p>
          ● Payment method:
          <span>
            <strong className="green"> Cash on delivery.</strong>
          </span>
        </p>
        <p className="modal-actions">
          <button className="text-button" onClick={handleOnFinish}>
            Okay
          </button>
          <button className="button" onClick={handleOnFinish}>
            Order more!
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <>
      <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
        <form action={formAction}>
          <h2>Checkout</h2>
          <p>Total Amount: {totalAmount}</p>
          <Input label="Full name" type="text" id="name" />
          <Input label="E-mail Address" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal code" type="number" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
          {error && (
            <p className="error-text">
              Ops! Something went wrong, please try again.
            </p>
          )}
          <p className="modal-actions">{!error && actions}</p>
        </form>
      </Modal>
    </>
  );
}
