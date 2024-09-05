import "./styles.css";
import { ContextProvider } from "./CartContext";
import List from "./List";
import Cart from "./Cart";
export default function App() {
  return (
    <ContextProvider>
      <List name="Macbook Pro" price={1200} />
      <List name="HP Pavilion" price={900} />
      <List name="ROG Gaming" price={1100} />
      <Cart />
    </ContextProvider>
  );
}
