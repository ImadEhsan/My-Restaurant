import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // ✅ Import persistStore
import storage from "redux-persist/lib/storage";
import productReducer from "../feature/product/productSlice.js";
import authReducer from "../feature/auth/authSlice.js";
import cartReducer from "../feature/cart/cartSlice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // ✅ Corrected whitelist (strings)
};
// ✅ Combine reducers
const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
});

// ✅ Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Important for redux-persist
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store);

export default store;
