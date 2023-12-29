// Import utilities to create store:
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index.js';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  timeout: null,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create store:
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


