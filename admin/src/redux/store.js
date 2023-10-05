import {configureStore , combineReducers} from "@reduxjs/toolkit"
import authReducer from './slice/authSlice'
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
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

const rootReducer = combineReducers({
    auth:authReducer,
    products: productReducer,
    order:orderReducer

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
