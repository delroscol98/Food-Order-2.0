import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCart = {
  items: [],
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //   updatedItems = state.items.concat(action.payload.item);
      const newItem = { ...action.payload.item, quantity: 1 };
      updatedItems = state.items.concat(newItem);
    }

    return { ...state, items: updatedItems };
  }

  if (action.type == "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== action.payload.item.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR") {
    return { ...state, items: [] };
  }

  return state;
};

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);

  const addItemToCart = (item) => {
    dispatchCart({ type: "ADD", payload: { item: item } });
  };

  const removeItemFromCart = (item, id) => {
    dispatchCart({ type: "REMOVE", payload: { item: item, id: id } });
  };

  const clearCart = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartCtx = {
    items: cart.items,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartCtx}> {children}</CartContext.Provider>
  );
};

export default CartProvider;
