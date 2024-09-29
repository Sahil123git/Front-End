import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const initialState = {
  list: [],
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, list: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
