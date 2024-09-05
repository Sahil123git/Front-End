import { useContext } from "react";
import { CartContext } from "./CartContext";
const Cart = () => {
  const cart = useContext(CartContext);
  return (
    <div>
      <h2>Cart Data</h2>
      {cart.items.map((ele, ind) => (
        <div key={crypto.randomUUID()}>
          {ele.name}:{ele.price}
        </div>
      ))}
    </div>
  );
};
export default Cart;
