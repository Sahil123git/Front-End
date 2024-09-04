import { createStore, combineReducers } from "redux";

// counterReducer.js (Normally in its own file)
const initialCounterState = { count: 0 };

function counterReducer(state = initialCounterState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// userReducer.js (Normally in its own file)
const initialUserState = { currentUser: null };

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };
    default:
      return state;
  }
}

// reducers/index.js (Combining reducers, normally in its own file)
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

// store.js (Creating the store, normally in its own file)
const store = createStore(rootReducer);

// Example: Dispatching Actions
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "LOGIN", payload: { name: "John Doe" } });

// Accessing the state
console.log(store.getState().counter.count); // Output: 1
console.log(store.getState().user.currentUser); // Output: { name: "John Doe" }
