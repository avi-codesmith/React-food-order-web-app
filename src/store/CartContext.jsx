import { createContext, useReducer } from "react";

//the variable names starts with Capital letter bcz we will use this as a tag
const CartContex = createContext({
  items: [],
  addItem: (items) => {},
  removeItem: (id) => {},
});

function handleReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    ``;
  }

  if (action.type === "REMOVE_ITEM") {
  }

  return state;
}

export function CartContexProvider({ children }) {
  const [state, dispatchstate] = useReducer(handleReducer);

  dispatchstate();

  return <CartContex>{children}</CartContex>;
}

export default CartContex;
