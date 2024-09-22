import { createContext, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addItemToCart(item) { // item is now a parameter
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == item.id);
    if (itemIndex == -1) {
      //-1 means item array mai nhi hai
      arr.push({ ...item, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems([...arr])
  }

  function removeItemFromCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    arr.splice(itemIndex, 1);
    setCartItems([...arr]);
  }

  function isItemAdded(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, isItemAdded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;