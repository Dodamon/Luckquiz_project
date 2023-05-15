import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import quizReducer from "./quiz";
import guestReducer from "./guest";
import guestSocketReducer from "./webSocket";



const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["userId", "name", "image_url", "isAuthenticated"],
};

const quizPersistConfig = {
  key: "quiz",
  storage,
  whitelist: ["hostId", "quizList", "templateId"],
};

const guestPersistConfig = {
  key: "guest",
  storage,
  whitelist: ["nickname","image"],
};


const persistedReducer = persistReducer(authPersistConfig, authReducer);
const persistedGuestReducer = persistReducer(guestPersistConfig, guestReducer);
const persistedQuizReducer = persistReducer(quizPersistConfig, quizReducer);


const store = configureStore({
  reducer: {
    quiz: persistedQuizReducer,
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

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
