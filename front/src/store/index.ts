import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import quizReducer from "./quiz";
import guestReducer from "./guest";
import guestSocketReducer from "./webSocket";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: [ "useId","isAuthenticated","connected"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedGuestReducer = persistReducer(persistConfig, guestReducer);

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: persistedReducer,
    guest: persistedGuestReducer,
    socket: guestSocketReducer,
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
