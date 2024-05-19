import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { initMessageListener } from "redux-state-sync";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

initMessageListener(store);

export const persistor = persistStore(store);
