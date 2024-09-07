import { useContext } from "react";
import { CartContext, useContextData } from "./CartContext";
const Cart = () => {
  const cart = useContext(CartContext);
  //   const cart  = useContextData(); //can use this to get data from context api
  return (
    <div>
      <h2>Cart Data</h2>
      {cart.items.map((ele) => (
        <div key={crypto.randomUUID()}>
          {ele.name}:{ele.price}
        </div>
      ))}
    </div>
  );
};
export default Cart;
