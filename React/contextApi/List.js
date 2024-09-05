import { useContext } from "react";
import { CartContext } from "./CartContext";

const List = ({ name, price }) => {
  const cart = useContext(CartContext);
  return (
    <div>
      <p>
        {name}: ${price}
      </p>
      <button
        onClick={() => {
          cart.setItems((prev) => [...prev, { name, price }]);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};
export default List;
