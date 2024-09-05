import { createContext, useState } from "react";

export const CartContext = createContext(null);
export const ContextProvider = (props) => {
  const [items, setItems] = useState([]);
  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
};
