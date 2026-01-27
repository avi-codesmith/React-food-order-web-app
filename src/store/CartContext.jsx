import { createContext, useReducer } from "react";

//the variable names starts with Capital letter bcz we will use this as a tag
const CartContex = createContext({
  items: [],
  addItem: (items) => {},
  removeItem: (id) => {},
});

function handleReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex >= 0) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];

    if (existingItem.quantity === 1) {
      const updatedItems = [...state.items];
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatedItem[existingItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContexProvider({ children }) {
  const [cart, dispatch] = useReducer(handleReducer, { items: [] });

  function addItem(item) {
    dispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartContext);

  return <CartContex value={cartContext}>{children}</CartContex>;
}

export default CartContex;
