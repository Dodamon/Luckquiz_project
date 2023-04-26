import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import guestReducer from "./guest";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "nickname","isAuthenticated","connected"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedGuestReducer = persistReducer(persistConfig, guestReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    guest: persistedGuestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist와 함께 사용하기 위해 직렬화 확인 무시
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
