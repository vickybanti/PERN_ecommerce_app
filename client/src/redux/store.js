import {configureStore , combineReducers} from "@reduxjs/toolkit"
import authReducer from './slice/authSlice'
import cartReducer from './slice/cartSlice';
import productReducer from './slice/ProductSlice'
import orderReducer from './slice/orderSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  savedItemReducer  from "./slice/savedItemSlice";
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders:orderReducer,
    savedProducts : savedItemReducer,

})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
