import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import userReducer from "@/redux/user.slice";
import restaurantReducer from "@/redux/restaurant-slice";
import cartReducer from "@/redux/cart.slice";

const rootReducer = combineReducers({
  user: userReducer,
  restaurant: restaurantReducer,
  cart: cartReducer,
});
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
  devTools: true,
});

export const persistor = persistStore(store);
