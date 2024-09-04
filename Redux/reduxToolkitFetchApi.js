// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// 1. Create an async thunk for API call
const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  return data;
});

// 2. Create a slice with actions, reducers, and extraReducers
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    item: null,
    status: "idle",
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.item = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const { reset } = todoSlice.actions;

// 3. Configure the store with the slice reducer
const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

// 4. Create a React component that uses Redux state, actions, and async thunk
function Todo() {
  const { item, status, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodo());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && item && (
        <div>
          <h1>Todo Item</h1>
          <p>ID: {item.id}</p>
          <p>Title: {item.title}</p>
          <p>Completed: {item.completed ? "Yes" : "No"}</p>
        </div>
      )}
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

// 5. Render the app wrapped in the Redux Provider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Todo />
  </Provider>
);
