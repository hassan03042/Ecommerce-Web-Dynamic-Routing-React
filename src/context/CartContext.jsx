import { createContext, useEffect, useState } from "react"; 

export const CartContext = createContext(); 

function CartContextProvider({ children }) {   
  const [cartItems, setCartItems] = useState([]);   
  const [isLoaded, setIsLoaded] = useState(false);    

  useEffect(() => {     
    const itemsFromStorage = localStorage.getItem("cartItems");     
    if (itemsFromStorage) {       
      setCartItems(JSON.parse(itemsFromStorage));       
    } 
    setIsLoaded(true); // Move this line here to avoid duplication
  }, []);    

  useEffect(() => {     
    if (isLoaded) {       
      localStorage.setItem("cartItems", JSON.stringify(cartItems));     
    }   
  }, [cartItems, isLoaded]);    

  function addItemToCart(item) {     
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((data) => data.id === item.id);
      if (itemIndex === -1) {
        return [...prevItems, { ...item, quantity: 1 }];
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity++;
        return updatedItems;
      }
    });
  }    

  function lessQuantityFromCart(id) {     
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((data) => data.id === id);
      if (itemIndex !== -1 && prevItems[itemIndex].quantity > 1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity--;
        return updatedItems;
      } else if (itemIndex !== -1) {
        // Remove item if quantity is 1
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems;
    });
  }

  function removeItemFromCart(id) {     
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));   
  }    

  function isItemAdded(id) {     
    return cartItems.find((data) => data.id === id) || null;   
  }    

  return (     
    <CartContext.Provider       
      value={{         
        cartItems,         
        addItemToCart,         
        removeItemFromCart,         
        isItemAdded,         
        lessQuantityFromCart,       
      }}     
    >       
      {children}     
    </CartContext.Provider>   
  ); 
} 

export default CartContextProvider;
