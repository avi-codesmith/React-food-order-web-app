import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  onFinish: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex >= 0) {
      const existingItem = state.items[existingItemIndex];

      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return { items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    if (existingItemIndex < 0) {
      return state;
    }

    const updatedItems = [...state.items];
    const existingItem = updatedItems[existingItemIndex];

    if (existingItem.quantity > 1) {
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
    } else {
      updatedItems.splice(existingItemIndex, 1);
    }

    return { items: updatedItems };
  }

  if (action.type === "FINISH") {
    return { items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function onFinish() {
    dispatch({ type: "FINISH" });
  }

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        addItem,
        removeItem,
        onFinish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
