import React from "react";
import ReactDOM from "react-dom/client";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";

//reducer.js
const INITAL_STATE = {
  todo: null,
};
const dataReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "GET_DATA":
      console.log("reached in add data");
      return { ...state, todo: action.payload };
    case "DELETE_DATA":
      console.log("reached in delete");
      return { todo: null };
    default:
      return state;
  }
};
const reducers = combineReducers({
  data: dataReducer,
});

//action.js
const deleteData = () => {
  return {
    type: "DELETE_DATA",
  };
};
const getData = () => {
  // Thunk Function
  return async (dispatch, getState) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    console.log({ data });
    dispatch({
      type: "GET_DATA",
      payload: data,
    });
  };
};

//App.js
const App = () => {
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.data);
  const handleAddData = () => dispatch(getData());
  const handleDeleteData = () => dispatch(deleteData());
  return (
    <div>
      <button onClick={handleAddData}>Get Data</button>
      <button onClick={handleDeleteData}>Delete Data</button>

      {todo && <div>{JSON.stringify(todo)}</div>}
    </div>
  );
};

//index.js
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for enabling redux extension
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
