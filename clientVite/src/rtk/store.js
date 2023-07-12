
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import thunk from "redux-thunk";

import storage from "../utils/createWebStorage";
import testReducer from "./features/testSlice";
import imeiReducer from "./features/imeiSlice";
import commonSlice from "./features/commonSlice";
import authSlice from "./features/authSlice";
import cartSlice from "./features/cartSlice";
import pricingSlice from "./features/pricingSlice";
import questionSlice from "./features/questionSlice";
import contactSlice from "./features/contactSlice";
import brandSlice from "./features/brandSlice";
import wholesaleSlice from "./features/wholesaleSlice";
import checkoutSlice from "./features/checkoutSlice";
import languageSlice from "./features/languageSlice";
import socketSlice from "./features/socketSlice";
import bookingSlice from "./features/bookingSlice";
import parkSlice from "./features/parkSlice";
import adminSlice from "./features/adminSlice";
import attrSlice from "./features/attrSlice";
import citiesSlice from "./features/citiesSlice";
import categoriesSlice from "./features/categoriesSlice";
import ordersSlice from "./features/ordersSlice";
import usersSlice from "./features/usersSlice";
import reviewSlice from "./features/reviewSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "book",
    "auth",
    "attractions",
    "cities",
    "categories",
    "orders",
    "users",
  ], // include slice name to persist
};

const reducers = combineReducers({
  socketId: socketSlice,
  test: testReducer,
  imei: imeiReducer,
  common: commonSlice,
  auth: authSlice,
  cart: cartSlice,
  pricing: pricingSlice,
  question: questionSlice,
  contact: contactSlice,
  brand: brandSlice,
  wholesale: wholesaleSlice,
  checkout: checkoutSlice,
  language: languageSlice,
  book: bookingSlice,
  parkGroup: parkSlice,
  admin: adminSlice,
  attractions: attrSlice,
  cities: citiesSlice,
  categories: categoriesSlice,
  orders: ordersSlice,
  users: usersSlice,
  reviews: reviewSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
