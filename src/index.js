import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import history from "./store/reducers/history";
import place from "./store/reducers/place";
import user from "./store/reducers/user";
import meeting from "./store/reducers/meeting";
import thunk from "redux-thunk";
import { BrowserRouter, HashRouter } from "react-router-dom";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const reducers = combineReducers({
  history,
  place,
  meeting,
  user
});

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhanders = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhanders(
  applyMiddleware(thunk))
)
const persistor = persistStore(store);

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <HashRouter basename="/" >
          <App />
        </HashRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)

ReactDOM.render(app,
  document.getElementById("root")
);
serviceWorker.unregister();
