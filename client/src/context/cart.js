import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
     try {
       return JSON.parse(localStorage.getItem("cart")) || [];
     } catch (error) {
       console.error("Error parsing cart from localStorage", error);
       return [];
     }


   
  });
useEffect(() => {
  let existingCartItem = localStorage.getItem("cart");
  if (existingCartItem) setCart(JSON.parse(existingCartItem));
}, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
