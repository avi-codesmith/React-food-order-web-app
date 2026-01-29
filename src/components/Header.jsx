import { use } from "react";

import logo from "../assets/logo.jpg";
import CartContex from "../store/CartContext";
import UserProgressContext from "../store/UserProgress";

export default function Header() {
  const { items } = use(CartContex);
  const { showCart } = use(UserProgressContext);

  const totalCartItems = items.reduce((totalNum, item) => {
    return totalNum + item.quantity;
  }, 0);

  function handleOpenCart() {
    showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Food logo" />
          <h1>
            React food
            <p>Tasty bite, cheap price</p>
          </h1>
        </div>
        <button onClick={handleOpenCart}>Cart ({totalCartItems})</button>
      </header>
    </>
  );
}
